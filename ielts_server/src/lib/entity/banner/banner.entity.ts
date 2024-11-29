import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
	name: 'band_score',
})
export class BannerEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text', default: '' })
	type: string;

	@Column({ type: 'text', default: '' })
	src: string;

	@Column({ type: 'text', default: '' })
	content: string;

}
