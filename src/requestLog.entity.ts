import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiKey } from './apiKey.entity';

@Entity()
export class RequestLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endpoint: string;

  @Column()
  requestTime: Date;

  @Column()
  requestMethod: string;

  @ManyToOne(() => ApiKey)
  apiKey: ApiKey; // Many logs can be associated with one API key
}
