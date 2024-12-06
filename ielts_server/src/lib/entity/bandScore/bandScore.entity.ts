import { UserAnswerDetail } from '../user/user-answer-detail.entity';
import { IBandScoreItem } from './i-bandScore-item';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
	name: 'band_score',
})
export class BandScoreEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text', default: '' })
	name: string;

	@Column({ type: 'text', default: '' })
	title: string;

	@Column({ type: 'json' })
	bands: IBandScoreItem[];

	@CreateDateColumn({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;

	check(data: UserAnswerDetail[]): number {
		const sortBands: IBandScoreItem[] = JSON.parse(JSON.stringify(this.bands));
		sortBands.sort((a, b) => b.max - a.max);
		const totalCorrect: number = data.reduce((acc, item) => {
			if (!Number.isFinite(item.score)) return acc;
			acc += item.score;
			return acc;
		}, 0);
		for (const band of sortBands) {
			if (totalCorrect >= band.min && totalCorrect <= band.max)
				return band.score;
		}
		return 0;
	}

	isReading() {
		return this.name.toLowerCase() === 'reading';
	}

	isListening() {
		return this.name.toLowerCase() === 'listening';
	}

	round(score: number) {
		const str = score.toString();
		const integerNumber = str[0];
		const firstPrefix = str.length > 2 ? str[2] : '0';
		const secondPrefix = str.length > 3 ? str[3] : '0';
		let prefix =
			Number.parseInt(firstPrefix) * 10 + Number.parseInt(secondPrefix);
		if (prefix < 25) return Number.parseFloat(integerNumber);
		if (prefix < 75 && prefix >= 25)
			return Number.parseFloat(integerNumber + '.5');
		return Number.parseInt(integerNumber) + 1;
	}
}
