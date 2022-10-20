import React from 'react'
import s from './Category.module.css'
import { useSelector } from 'react-redux'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import MovieCard from '../MovieCard/MovieCard';

const Category = ({category}) => {
    const { movies, selected, voted } = useSelector(state => state);
    const filteredMovies = movies?.filter(m => m.category === category)

    return (
        <div className={s.container}>
            <h2>Category: "{category}"</h2>
            <h5>{selected?.some(s => s.category === category)
                    ? `You've selected one from this category`
                    : voted?.some(v => v.category === category)
                        ? `You've voted one from this category`
                        : `Select your favorite one from this category`
                }
            </h5>
            <div className={s.slider}>
                <CarouselProvider
                    visibleSlides={4}
                    step={4}
                    naturalSlideHeight={150}
                    naturalSlideWidth={110}
                    totalSlides={filteredMovies?.length}
                    infinite
                >
                    <div className={s.controls}>
                        <ButtonBack>{'<'}</ButtonBack>
                        <ButtonNext>{'>'}</ButtonNext>
                    </div>
                    <Slider>
                        {filteredMovies?.map(m =>
                            <Slide key={Math.random()}>
                                <MovieCard movie={m} key={m.id}/>
                            </Slide>
                        )}
                    </Slider>
                </CarouselProvider>
            </div>
        </div>
    )
}

export default Category