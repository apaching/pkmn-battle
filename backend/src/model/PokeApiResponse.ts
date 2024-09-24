
export interface PokeApiResponse {
    name: string;
    sprites: {
        front_default: string; 
        back_default: string;
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    } [];
}
