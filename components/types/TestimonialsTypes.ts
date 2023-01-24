export type TestimonialsProps = {
  data: TestimonialsData;
}

export type TestimonialsData = {
  homePage: {
    data: {
      attributes: {
        dynamicZone: ComponentLayoutTestimonials[];
      }
    }
  }
}

export type ComponentLayoutTestimonials = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  testimonials: {
    data: Testimonial[];
  }
}

export type Testimonial = {
  attributes: {
    name: string;
    job: string;
    content: string;
    image: {
      data: {
        attributes: {
          name: string;
          url: string;
        }
      }
    }
  }
}