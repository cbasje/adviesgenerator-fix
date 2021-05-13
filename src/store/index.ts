import axios from 'axios';
import { createStore } from 'vuex';

enum KeuzeOpties {
	Ja = 'Ja',
	Nee = 'Nee',
	GeenIdee = 'GeenIdee',
}

function getRandomNumber(min: number, max: number) {
	const diff = max - min;
	const random = Math.random() * diff + min;
	return Math.round(random);
}

const store = createStore({
	state: {
		keuzeObject: {
			keuze: KeuzeOpties.GeenIdee,
		},
		excuses: [],
		keuzes: [
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
		],
	},
	getters: {
		getRandomExcuus(state: any) {
			return state.excuses[getRandomNumber(0, state.excuses.length)];
		},
		getKeuzeObject(state: any) {
			return state.keuzeObject;
		},
	},
	actions: {
		async loadExcuses({ commit }) {
			const request = await axios.get(
				`${process.env.VUE_APP_SITE_URL}/excuses`
			);
			commit('saveExcuses', request.data);
		},
		async addExcuses({ commit, state }, payload: string) {
			const request = await axios.post(
				`${process.env.VUE_APP_SITE_URL}/excuses-new`,
				{ excuus: payload }
			);

			request.data.excuus ??
				commit('saveExcuses', [...state.excuses, request.data.excuus]);
		},
	},
	mutations: {
		setKeuze(state: any, payload: string) {
			state.keuzeObject = state.keuzes.find(
				(k: any) => k.keuze == payload
			);
		},
		saveExcuses(state: any, payload: [string]) {
			state.excuses = payload;
		},
	},
});

export default store;
