import fetch from "node-fetch";
import users from "./users.mjs";
import config from "./config.mjs";

const host = `https://${ config.host }`;
const defaultUser = config.defaultUser;

// 👍 👎 👏 🔥 🎉️ 💜 😎 💩
const reactions = [ "1", "2", "3", "4", "5", "6", " 7", "8" ];
const boardId = config.boardId;

// 🎲🎲🎲
const chooseRandom = arr => {
	return arr[ Math.floor( Math.random() * arr.length ) ];
}

// 😴😴😴
const snooze = ms => new Promise( resolve => setTimeout( resolve, ms ) );

// 🪜🪜🪜
const step = async ( cardIds ) => {
	const card = chooseRandom( cardIds );
	const reaction = chooseRandom( reactions );
	const user = chooseRandom( users ) || defaultUser;

	const username = user.username;
	const password = user.password;

	console.log( `requesting reaction for: ${ username }` );

	let response
	try {
		response = await fetch( `${ host }/io/card/${ card }/reaction`, {
			method: 'post',
			body: JSON.stringify( { reaction } ),
			headers: { 
				"Content-Type": "application/json",
				'Authorization': 'Basic ' + Buffer.from( `${ username }:${ password }`, 'binary' ).toString( 'base64' )
			}
		} );
	} catch ( err ) {
		console.log( err );
	}

	const data = await response.json();
	console.log( "request", data );
};

// 🃏🃏🃏
const getBoardCards = async boardId => {
	const username = defaultUser.username;
	const password = defaultUser.password;

	const response = await fetch( `${ host }/io/cardface?board=${ boardId }&limit=500`, {
		method: 'get',
		headers: { 
			"Content-Type": "application/json",
			'Authorization': 'Basic ' + Buffer.from( `${ username }:${ password }`, 'binary' ).toString( 'base64' )
		}
	});

	const data = await response.json();
	return data.cards.map( c => c.id );
}

// ✨ 🤠 ✨ 🤠 ✨ 🤠
const emojiBlaster = async () => {
	const boardCardIds = await getBoardCards(  boardId );

	while ( true ) {
		await step( boardCardIds );
		const req_delay = 100 + Math.random() * 250;
		await snooze( req_delay );
	}
}

// 🎊 🤩 🙌
await emojiBlaster();
