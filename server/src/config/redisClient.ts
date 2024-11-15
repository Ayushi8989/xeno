import { createClient } from 'redis';

const subscriberClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6380', 
});
const publisherClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6380',
});

subscriberClient.on('error', (err) => console.error('Subscriber Client Error', err));
publisherClient.on('error', (err) => console.error('Publisher Client Error', err));

(async () => {
    await subscriberClient.connect();
    await publisherClient.connect();
    console.log('\nRedis Clients (Subscriber and Publisher) Connected!\n');
})();

export { subscriberClient, publisherClient };

