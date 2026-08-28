export type Education = {
  id: string
  school: string
  degree?: string
  fieldOfStudy?: string
  period: {
    start: string
    end?: string
  }
  description?: string
  skills?: string[]
  logo?: string
  isExpanded?: boolean
}
