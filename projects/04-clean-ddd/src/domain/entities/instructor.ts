import { Entity } from '../../core/entities/entities'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  constructor(props: InstructorProps, id?: string) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }
}
