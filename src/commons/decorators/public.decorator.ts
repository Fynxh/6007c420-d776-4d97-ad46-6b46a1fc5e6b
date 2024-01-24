import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../constants/public-key.constant';

export const Public = () => SetMetadata<string, boolean>(PUBLIC_KEY, true);
