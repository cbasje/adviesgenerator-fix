<template>
	<ion-page ref="page">
		<ion-header :translucent="true">
			<ion-toolbar :color="!ios ? 'primary' : null">
				<ion-title>Ruben's Adviesgever</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Ruben's Adviesgever</ion-title>
				</ion-toolbar>
			</ion-header>

			<ion-content class="ion-padding">
				<div class="container-sm">
					<div class="content">
						<!-- <ion-text class="ion-text-wrap keuze-text">
							Ik heb een beslissing en ik wil het volgende antwoorden:
						</ion-text> -->
						<p class="keuze-text">
							Ik heb een beslissing en ik wil het volgende
							antwoorden:
						</p>
						<div class="ion-padding keuze-button">
							<ion-button
								size="large"
								expand="block"
								class="keuze-ja"
								strong
								@click="openKeuze('Ja')"
								color="success"
								>Ja</ion-button
							>
						</div>

						<div class="ion-padding keuze-button">
							<ion-button
								size="large"
								expand="block"
								class="keuze-nee"
								strong
								@click="openKeuze('Nee')"
								color="danger"
								>Nee</ion-button
							>
						</div>
					</div>
				</div>
			</ion-content>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	modalController,
	isPlatform,
} from '@ionic/vue';
import Keuze from './Keuze.vue';
import { defineComponent, ref } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
	name: 'Home',
	components: {
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
		IonButton,
	},
	setup() {
		const page = ref();
		const ios = isPlatform('ios');

		return { page, ios };
	},
	mounted() {
		this.loadExcuses();
	},
	methods: {
		async openKeuze(keuze: string) {
			const modal = await modalController.create({
				component: Keuze,
				cssClass: 'keuze-class',
				swipeToClose: true,
				presentingElement: this.page.$el,
				componentProps: {
					keuze: keuze,
				},
			});
			return modal.present();
		},
		...mapActions({
			loadExcuses: 'loadExcuses',
		}),
	},
});
</script>

<style scoped>
.container-sm {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.content {
	width: 100%;
	display: grid;
	justify-items: stretch;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		'keuzeText keuzeText'
		'keuzeJa keuzeNee';
	text-align: center;
}

.keuze-text {
	grid-area: keuzeText;
}

.keuze-ja,
.keuze-nee {
	max-width: 35vw;
	margin: 0 auto;
	aspect-ratio: 1 / 1;
}
.keuze-ja {
	grid-area: keuzeJa;
}
.keuze-nee {
	grid-area: keuzeNee;
}
@supports not (aspect-ratio: 1 / 1) {
	/* .keuze-ja::before,
	.keuze-nee::before {
		float: left;
		padding-top: 100%;
		content: "";
	}

	.keuze-ja::after,
	.keuze-nee::after {
		display: block;
		content: "";
		clear: both;
	} */
	.keuze-ja,
	.keuze-nee {
		width: 40vw;
		height: 40vw;
	}
}

ion-button {
	--border-radius: 50%;
	--padding-bottom: 0;
	--padding-end: 0;
	--padding-start: 0;
	--padding-top: 0;
	height: 100%;
}

@media (max-width: 767px) and (orientation: portrait) {
	.content {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr 1fr;
		grid-template-areas:
			'keuzeText'
			'keuzeJa'
			'keuzeNee';
	}

	.keuze-ja,
	.keuze-nee {
		max-width: 40vh;
	}
	@supports not (aspect-ratio: 1 / 1) {
		.keuze-ja,
		.keuze-nee {
			width: 50vw;
			height: 50vw;
		}
	}
}
</style>
