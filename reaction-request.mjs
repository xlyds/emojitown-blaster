import https from "https";

/**
 * Do a request with options provided.
 *
 * @param {Object} options
 * @param {Object} data
 * @return {Promise} a promise of request
 */
 function doRequest(options, data) {
	return new Promise((resolve, reject) => {
		const req = https.request(options, (res) => {
			res.setEncoding('utf8');
			let responseBody = '';
	
			res.on('data', (chunk) => {
				responseBody += chunk;
			});
	
			res.on('end', () => {
				resolve(JSON.parse(responseBody));
			});
		});

		req.on('error', (err) => {
			reject(err);
		}); 
		req.write(data)
		req.end();
	});
 };

export default async function reactionRequest( hostname, card, reaction, auth ) {

	const payload = JSON.stringify({
		reaction: reaction
	});

	const options =JSON.stringify({
		host: `${ hostname }/io/card/${ card }/reaction`,
		path: ``,
		method: "POST",
		auth,
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': 38
		  }
	});
	return await doRequest(options, payload);
}