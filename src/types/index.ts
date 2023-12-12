import { User, Word } from '@prisma/client'

export interface WordData extends Word {
  dataUrl: string | null;
}