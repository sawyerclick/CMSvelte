import { S3Client } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import S3SyncClient from 's3-sync-client';

import 'dotenv/config';

const monitor = new S3SyncClient.TransferMonitor();

monitor.on('progress', (progress) => {
	console.log(progress.count.current, ' / ', progress.count.total);
	if (progress.count.current === progress.count.total) {
		console.log(`\n\x1b[32mSuccessfully synced to S3 bucket ${process.env.S3_BUCKET}!`);
	}
});

const { sync } = new S3SyncClient({
	client: new S3Client({
		region: process.env.S3_REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
		}
	})
});

const timeout = setInterval(() => console.log(monitor.getStatus()), 2000);

try {
	await sync('./build', process.env.S3_BUCKET, {
		monitor,
		commandInput: {
			ContentType: (syncCommandInput) => mime.lookup(syncCommandInput.Key) || 'text/html'
		}
	});
} finally {
	clearInterval(timeout);
}
