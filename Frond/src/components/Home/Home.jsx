import style from './Home.module.css'
import React from 'react';


const Collection = () => {

	return (
		<section className={style.todoCollection}>
            <section className={style.primerDiv}>
                <div>
                    <h2>Collections</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                    <button>Shop</button>
                </div>
                <div>
                    <div className={style.img}>img</div>
                </div>
            </section>
            <section>
                <h2>nuevos productos</h2>
                <div className={style.flex}>
                    <p>img</p>
                    <p>img</p>
                    <p>img</p>
                    <p>img</p>
                    <p>img</p>
                </div>
                <h2>Nuestros Productos</h2>
                <div className={style.productos}>
                    <div className={style.flex}>
                        <div><p>img</p></div>
                        <div>
                            <p>hkdsj</p>
                            <p>20000</p>
                            <div>
                                <button>sadfas</button>
                                <button>sadfasd</button>
                            </div>
                        </div>
                    </div>
                    <div className={style.flex}>
                        <div><p>img</p></div>
                        <div>
                            <p>hkdsj</p>
                            <p>20000</p>
                            <div>
                                <button>sadfas</button>
                                <button>sadfasd</button>
                            </div>
                        </div>
                    </div>
                    <div className={style.flex}>
                        <div><p>img</p></div>
                        <div>
                            <p>hkdsj</p>
                            <p>20000</p>
                            <div>
                                <button>sadfas</button>
                                <button>sadfasd</button>
                            </div>
                        </div>
                    </div>
                    <div className={style.flex}>
                        <div><p>img</p></div>
                        <div>
                            <p>hkdsj</p>
                            <p>20000</p>
                            <div>
                                <button>sadfas</button>
                                <button>sadfasd</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.flex}>
                <div>
                    <p>lkjsadhfjashdkjasdfdasdfasdfhasd</p>
                </div>
                <div>
                    <div className={style.imgRedonda}>img</div>
                    <button>askldj</button>
                </div>
            </section>
            <section>
                <p>rrewe</p>
                <p>fkjsdhfjksdhflksd</p>
                <div className={style.productos}>
                    <div>
                        <div className={style.title}>
                            <div>123</div>
                            <dir>4.7</dir>
                        </div>
                        <p>sdkjfhasdjkfhskdl</p>
                        <div className={style.title}>
                            <div>img</div>
                            <p>skhdkashd</p>
                        </div>
                    </div>
                    <div>
                        <div className={style.title}>
                            <div>123</div>
                            <dir>4.7</dir>
                        </div>
                        <p>sdkjfhasdjkfhskdl</p>
                        <div className={style.title}>
                            <div>img</div>
                            <p>skhdkashd</p>
                        </div>
                    </div>
                    <div>
                        <div className={style.title}>
                            <div>123</div>
                            <dir>4.7</dir>
                        </div>
                        <p>sdkjfhasdjkfhskdl</p>
                        <div className={style.title}>
                            <div>img</div>
                            <p>skhdkashd</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.productos}>
                <div>
                    <div>img</div>
                    <p>dkasdhask</p>
                </div>
                <div>
                    <div>img</div>
                    <p>dkasdhask</p>
                </div>
                <div>
                    <div>img</div>
                    <p>dkasdhask</p>
                </div>
                <div>
                    <div>img</div>
                    <p>dkasdhask</p>
                </div>
            </section>
        </section>
	)
}



export default Collection;