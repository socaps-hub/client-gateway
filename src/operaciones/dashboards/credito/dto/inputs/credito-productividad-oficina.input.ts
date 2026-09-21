import { InputType } from '@nestjs/graphql';
import { CreditoProductividadBaseInput } from './credito-productividad-base.input';

@InputType()
export class CreditoProductividadOficinaInput extends CreditoProductividadBaseInput {}
