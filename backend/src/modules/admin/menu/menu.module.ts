import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/entities/menu.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Menu
    ])],
    providers: [MenuService],
    controllers: [MenuController],
    exports: [TypeOrmModule]
})
export class MenuModule { }
