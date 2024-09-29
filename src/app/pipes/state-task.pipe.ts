import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateTask',
  standalone: true,
})
export class StateTaskPipe implements PipeTransform {
  transform(value: boolean): unknown {
    return value ? 'Completada' : 'Pendiente';
  }
}
