
  
export interface CreateUpdateVinyl {
    price: number;
    nameOfVinyl: string;
    description: string;
    authorName:string
    photo?:string
}

export interface CreateUpdateReview {
    comment: string;
    score: string;
}
export interface CreateUpdateUser {
    firstName: string;
    lastName: string;
}