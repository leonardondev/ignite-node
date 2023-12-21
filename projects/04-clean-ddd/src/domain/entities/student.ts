import { Entity } from '../../core/entities/entities'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  constructor(props: StudentProps, id?: string) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }
}
