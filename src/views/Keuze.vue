<template>
	<ion-header>
		<ion-toolbar :color="!ios ? 'primary' : null">
			<ion-title>{{ keuzeObject.title }}</ion-title>
			<ion-buttons slot="end">
				<ion-button @click="closeModal()">
					<ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>

	<ion-content class="ion-padding">
		<ion-img :src="keuzeObject.image" />
		<ion-label class="ion-padding">
			<h2>Gebruik dit excuus:</h2>
			<p>{{ excuus }}</p>
		</ion-label>
	</ion-content>
</template>

<script lang="ts">
import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonButton,
	IonIcon,
	IonImg,
	IonLabel,
	modalController,
	isPlatform,
} from '@ionic/vue';
import { closeCircle } from 'ionicons/icons';
import { defineComponent } from 'vue';

import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';

enum KeuzeOpties {
	Ja = 'Ja',
	Nee = 'Nee',
	GeenIdee = 'GeenIdee',
}

export default defineComponent({
	name: 'Keuze',
	components: {
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		IonButtons,
		IonButton,
		IonIcon,
		IonImg,
		IonLabel,
	},
	props: {
		keuze: { type: String, default: 'Geen idee' },
	},
	data() {
		const keuzes = [
			{
				keuze: KeuzeOpties.Ja,
				title: 'Nee! Af! Niet doen!',
				image: require('../assets/ja_gif.gif'),
				sound: require('../assets/ja_sound.mp3'),
			},
			{
				keuze: KeuzeOpties.Nee,
				title: 'Geweldig! Hier een excuus.',
				image: require('../assets/nee_gif.gif'),
				sound: require('../assets/nee_sound.mp3'),
			},
		];
		const excuses = [
			'Nee!',
			'Dan ben ik ziek, sorry',
			'Dan ben in het Verre Oosten om specerijen te verzamelen, sorry',
			'Ik zit dan in Egypte voor de CoBo van Toetanchamon',
			'Volgende week? Ik dacht dat het over twee weken was, dus ik heb dan al iets gepland.',
			'Ik heb best wel hoofdpijn dus ik reageer later wel',
			"Oh nee he, ik heb me verslapen, dus dat gaat 'm niet meer worden dan...",
			'Ik stond op het punt ja te zeggen, maar toen kwam ik er achter dat mijn band lek was, dus ja...',
			'Dan ben ik waarschijnlijk ongesteld en dat gaat niet goed samen...',
			'Vorige week tijdens de k.f.t.-bestuursreis naar Jeruzalem op onze kamelen kwam ' +
				'ik dus een dromedaris tegen. Dat zijn natuurlijk geen goede vervoersmiddelen en ' +
				'daarom wilde ik dat beest gebruiken als een offermaal. Dit ging niet helemaal volgens ' +
				'plan en toen ik in het zand viel, verloor ik mijn telefoon. Tijdens het zoeken naar ' +
				'mijn telefoon brak ik ook nog eens mijn been en daarom kan ik dus dat niet, sorry...',
			'Ik mail je er volgende week even over...',
			'Ik heb dan waarschijnlijk vertraging door de verschrikkelijke NS',
			'Mijn goudvis is net doodgegaan en dat hakt er wel echt in, dus ik denk dat ik de ' +
				'komende tijd even thuis blijf om dit te verwerken...',
			'De Sebastiaansbrug staat open, dus ik kan er niet op tijd zijn denk ik...',
		];
		const randomExcuus = excuses[this.getRandomNumber(0, excuses.length)];

		this.showToast();
		this.setClipboard(randomExcuus);

		return {
			keuzeObject: keuzes.find((k) => k.keuze == this.keuze),
			excuus: randomExcuus,
			audio: new Audio()
		};
	},
	setup() {
		const ios = isPlatform('ios');

		return {
			closeCircle,
			ios,
		};
	},
	mounted() {
		if (this.keuzeObject == null) {
			return;
		}

		this.audio = new Audio(this.keuzeObject.sound);
		this.audio.play();
	},
	methods: {
		closeModal() {
			this.audio.pause();
			modalController.dismiss();
		},
		getRandomNumber(min: number, max: number) {
			const diff = max - min;
			const random = Math.random() * diff + min;
			return Math.round(random);
		},
		async showToast() {
			await Toast.show({
				text: 'Het excuus is toegevoegd aan je klembord',
			});
		},
		async setClipboard(excuus: string) {
			await Clipboard.write({
				string: excuus,
			});
		},
	},
});
</script>
