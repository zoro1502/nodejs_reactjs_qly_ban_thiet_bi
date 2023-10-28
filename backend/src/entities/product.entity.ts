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
import { ProductsImages } from './product-image.entity';
import { Category } from './category.entity';
import { Vote } from './vote.entity';

@Index('products_pkey', ['id'], { unique: true })
@Entity('products', { schema: 'public' })
export class Products {
	@PrimaryGeneratedColumn('increment',{name: "id"})
	id: number;

	@Column('character varying', { name: 'name', length: 255 })
	name: string | null;

	@Column('character varying', { name: 'description', length: 255, nullable: true })
	description: string | null;

	@Column()
	avatar: string;

	@Column('character varying', { name: 'slug', nullable: false })
	slug: string | null;

	@Column('text', { name: 'content', nullable: false })
	content: string | null;

	@Column('smallint', { name: 'status', nullable: false, default: -1 })
	status: number | -1;

	@Column('smallint', { name: 'hot', nullable: false, default: -1 })
	hot: number;

	@Column('bigint', { name: 'category_id', nullable: false })
	category_id: number;

	@Column('json', { name: 'options', nullable: false })
	options: any;

	@Column('float', { name: 'price', nullable: false, default: 0 })
	price: number;

	@Column('int', { name: 'number', nullable: false, default: 0})
	number: number;

	@Column('int', { name: 'count_buy', nullable: true, default: 0})
	count_buy: number | 0;

	@Column('bool', { name: 'is_wholesale', nullable: true, default: false})
	is_wholesale: boolean | false;

	@Column('int', { name: 'province_id', default: 0})
	province_id: number;

	@Column('int', { name: 'district_id', default: 0})
	district_id: number;

	@Column('int', { name: 'ward_id', default: 0})
	ward_id: number;

	@Column('smallint', { name: 'sale', nullable: false, default: -1 })
	sale: number;

	@Column('bigint', { name: 'user_id', nullable: false, default: 0 })
	user_id: number;


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

	@OneToMany(() => ProductsImages, image => image.product)
	product_images: ProductsImages[];

	@ManyToOne(() => Category, cate => cate.products)
	@JoinColumn({ name: "category_id", referencedColumnName: "id"})
	category: Category;
	
	@OneToMany(() => Vote, (vote) => vote.product)
	votes: Vote[];
}
