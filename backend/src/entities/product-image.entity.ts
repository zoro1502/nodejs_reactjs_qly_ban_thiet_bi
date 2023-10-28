import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './product.entity';

@Index('products_images_pkey', ['id'], { unique: true })
@Entity('products_images', { schema: 'public' })
export class ProductsImages {
	@PrimaryGeneratedColumn('increment',{name: "id"})
	id: number;

	@Column('character varying', { name: 'name', length: 255 })
	name: string | null;

	@Column('character varying', { name: 'path', length: 255, nullable: true })
	path: string | null;

	@Column('bigint', { name: 'product_id', nullable: false })
	product_id: number;

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

	@ManyToOne(() => Products, product => product.product_images)
	@JoinColumn([{ name: "product_id", referencedColumnName: "id"}])
	product: Products;
}
