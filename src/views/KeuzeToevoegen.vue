<template>
	<ion-header>
		<ion-toolbar :color="!ios ? 'primary' : null">
			<ion-title>Nieuwe keuze</ion-title>
			<ion-buttons slot="end">
				<ion-button @click="closeModal()">
					<ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>

	<ion-content class="ion-padding">
        <form @submit.prevent="submit" method="post">
            <ion-item>
                <ion-textarea placeholder="Voeg een nieuw excuus toe..."></ion-textarea>
            </ion-item>
            <ion-button type="submit" expand="block">
                Toevoegen
            </ion-button>
        </form>
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
    IonItem,
	IonTextarea,
	modalController,
	isPlatform,
} from '@ionic/vue';
import { closeCircle } from 'ionicons/icons';
import { defineComponent } from 'vue';

import { Toast } from '@capacitor/toast';

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
        IonItem,
        IonTextarea,
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
		this.showToast();
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
        submit() {
            this.closeModal();
        }
	},
});
</script>

<style scoped>
ion-button {
    margin-top: 8px;
}
</style>