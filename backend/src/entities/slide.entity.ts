import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('slides', { schema: 'public' })
export class Slide {
	@PrimaryGeneratedColumn('increment',{name: "id"})
	id: number;

	@Column('character varying', { name: 'avatar', nullable: true })
	avatar: string | null;

	@Column('character varying', { name: 'link', nullable: true })
	link: string | null;

	@Column('character varying', { name: 'name', nullable: true })
	name: string | null;

	@Column('smallint', { name: 'status', nullable: false, default: 0 })
	status: number | 0;

	@Column('smallint', { name: 'hot', nullable: false, default: 0 })
	hot: number | 0;

	@Column('timestamp with time zone', {
		name: 'created_at',
		default: () => 'now()',
	})
	created_at: Date;

	@Column('timestamp with time zone', {
		name: 'updated_at',
		nullable: true,
		default: () => 'now()',
	})
	updated_at: Date;
}
