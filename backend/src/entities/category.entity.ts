import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './product.entity';

@Entity('categories', { schema: 'public' })
export class Category {
	@PrimaryGeneratedColumn('increment',{name: "id"})
	id: number;

	@Column('character varying', { name: 'name', length: 255 })
	name: string | null;

	@Column('character varying', { name: 'description', length: 255, nullable: true })
	description: string | null;

	@Column('character varying', { name: 'avatar', nullable: true })
	avatar: string | null;

	@Column('character varying', { name: 'slug', nullable: false })
	slug: string | null;

	@Column('smallint', { name: 'status', nullable: false, default: 0 })
	status: number | -1;

	@Column('smallint', { name: 'hot', nullable: false, default: 0 })
	hot: number | -1;

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

	@OneToMany(() => Products, (products) => products.category)
	@JoinColumn([{ name: "id", referencedColumnName: "category_id" }])
    products: Products[];
}
