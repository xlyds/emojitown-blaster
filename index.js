import reactionRequest from "./reaction-request.mjs";
import fetch from "node-fetch";
import Users from "./ReactionUsers.mjs";
import Cards from "./cards.mjs";

const hostname = "https://dev.localkanban.com";

const reactions = [ "1", "2", "3", "4", "5", "6" ];

const chooseRandom = arr => {
	return arr[ Math.floor( Math.random() * arr.length )];
}


const step = async () => {
	const card = chooseRandom( Cards );
	const reaction = chooseRandom( reactions );

	const user = chooseRandom( Users );
	const username = user["username"];
	const password = user["password"];

	console.log( `requesting reaction for: ${ username }`)

	const response = await fetch( `${ hostname }/io/card/${ card }/reaction`, {
		method: 'post',
		body: JSON.stringify({ reaction }),
		headers: { 
			"Content-Type": "application/json",
			'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`, 'binary').toString('base64')
		}
	} );

	const data = await response.json();

	console.log( "request", data );
};


while (true) {
	await step()
	const req_delay = Math.random() * 1000;
	setTimeout( () => {}, req_delay );
}
