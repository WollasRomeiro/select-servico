const amqp = require('amqp-connection-manager');

function createAmqpConnection() {
  return amqp.connect(['amqps://svbmmqly:iRsHz58gkVYWsST3ngd_fYxlLmCnUxns@jackal.rmq.cloudamqp.com/svbmmqly']);
}

async function createChannel(connection, queueName) {
  const channelPromise = connection.createChannel({ json: true });
  const channel = await channelPromise;

  await channel.assertQueue(queueName, { durable: true });

  return channel;
}

export async function publishToQueue(channel, queueName, message) {
  channel.sendToQueue(queueName, message);
  return message;
}

export function publishWroker(message: any) {
  const queue = 'create_worker';

  (async () => {
    try {
      const connection = createAmqpConnection();
      const channel = await createChannel(connection, queue);

      const publishedMessage = await publishToQueue(channel, queue, message);

      console.log('Mensagem publicada com sucesso:', publishedMessage);
    } catch (err) {
      console.error('Erro ao publicar a mensagem', err);
    }
  })();
}
