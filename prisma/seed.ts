import { PrismaClient } from '@prisma/client';
import * as bc from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
	// await prisma.user.createMany({
	// 	data: [
	// 		{
	// 			username: 'user01',
	// 			password: await bc.hash('123456', 10)
	// 		},
	// 		{
	// 			username: 'user02',
	// 			password: await bc.hash('123456', 10)
	// 		}
	// 	]
	// });

	await prisma.category.createMany({
		data: [
			{
				name: 'REBALANCE',
				color: '',
				type: 'REBALANCE',
				forAll: false
			},
			{
				name: 'category.food',
				color: '#e6e6e6',
				type: 'OUTCOME',
				forAll: true
			},
			{
				name: 'category.house',
				color: '#e6e6e6',
				type: 'OUTCOME',
				forAll: true
			},
			{
				name: 'category.other',
				color: '#e6e6e6',
				type: 'OUTCOME',
				forAll: true
			},
			{
				name: 'category.paycheck',
				color: '#e6e6e6',
				type: 'INCOME',
				forAll: true
			}
		]
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
