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
		excuses: [
			// 'Nee!',
			// 'Dan ben ik ziek, sorry',
			// 'Dan ben in het Verre Oosten om specerijen te verzamelen, sorry',
			// 'Ik zit dan in Egypte voor de CoBo van Toetanchamon',
			// 'Volgende week? Ik dacht dat het over twee weken was, dus ik heb dan al iets gepland.',
			// 'Ik heb best wel hoofdpijn dus ik reageer later wel',
			// "Oh nee he, ik heb me verslapen, dus dat gaat 'm niet meer worden dan...",
			// 'Ik stond op het punt ja te zeggen, maar toen kwam ik er achter dat mijn band lek was, dus ja...',
			// 'Dan ben ik waarschijnlijk ongesteld en dat gaat niet goed samen...',
			// 'Vorige week tijdens de k.f.t.-bestuursreis naar Jeruzalem op onze kamelen kwam ' +
			// 	'ik dus een dromedaris tegen. Dat zijn natuurlijk geen goede vervoersmiddelen en ' +
			// 	'daarom wilde ik dat beest gebruiken als een offermaal. Dit ging niet helemaal volgens ' +
			// 	'plan en toen ik in het zand viel, verloor ik mijn telefoon. Tijdens het zoeken naar ' +
			// 	'mijn telefoon brak ik ook nog eens mijn been en daarom kan ik dus dat niet, sorry...',
			// 'Ik mail je er volgende week even over...',
			// 'Ik heb dan waarschijnlijk vertraging door de verschrikkelijke NS',
			// 'Mijn goudvis is net doodgegaan en dat hakt er wel echt in, dus ik denk dat ik de ' +
			// 	'komende tijd even thuis blijf om dit te verwerken...',
			// 'De Sebastiaansbrug staat open, dus ik kan er niet op tijd zijn denk ik...',
		],
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
				'https://adviesgenerator-api.glitch.me/excuses'
			);
			commit('saveExcuses', request.data);
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
