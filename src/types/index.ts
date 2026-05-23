export interface Property {
  id: number
  price: string
  address: string
  beds: number
  baths: number
  sqft: number
  acres?: string
  neighborhood: string
  mls?: string
  image: string
  description?: string
  features?: string[]
  isNew?: boolean
}

export interface Neighborhood {
  name: string
  avgPrice: string
  listings: number
  tagline: string
  image: string
}

export interface Service {
  number: string
  title: string
  description: string
}

export interface TeamMember {
  name: string
  title: string
  experience: string
  image: string
}

export interface Testimonial {
  quote: string
  client: string
  property: string
}

export interface NavLink {
  label: string
  href: string
}
