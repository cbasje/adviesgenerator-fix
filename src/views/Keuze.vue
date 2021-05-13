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
			<p>{{ this.randomExcuus.text }}</p>
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
import { mapGetters, mapMutations } from 'vuex';

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
		return {
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
		this.setKeuze(this.keuze);

		if (this.keuzeObject == null) {
			return;
		}

		this.showToast();
		this.setClipboard(this.randomExcuus.text);

		this.audio = new Audio(this.keuzeObject.sound);
		this.audio.play();
	},
	methods: {
		closeModal() {
			this.audio.pause();
			modalController.dismiss();
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
		...mapMutations({
			setKeuze: 'setKeuze',
		})
	},
	computed: {
		...mapGetters({
			randomExcuus: 'getRandomExcuus',
			keuzeObject: 'getKeuzeObject'
		})
	}
});
</script>
