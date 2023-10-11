import { Set } from 'src/sets/entities/set.entity';
import { datatype } from 'faker';

export function generateSet(exerciseId: number): Partial<Set> {
  const set = {
    weight: datatype.number(100),
    reps: datatype.number(15),
    set_num: datatype.number(5),
    exercise_id: exerciseId,
  };
  return set;
}
