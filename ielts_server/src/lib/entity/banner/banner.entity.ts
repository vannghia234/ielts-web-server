import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EBannerType } from './EBannerType';

@Entity({
	name: 'banner',
})
export class BannerEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'enum', enum: EBannerType, default: EBannerType.text })
	type: EBannerType;

	@Column({ type: 'text', default: '' })
	src: string;

	@Column({ type: 'text', default: '' })
	content: string;

}
