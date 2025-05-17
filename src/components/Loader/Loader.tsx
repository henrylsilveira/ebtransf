import { Logo } from '../Logo/Logo'
import styles from './styles.module.css'
export function Loader({ loadingPage, noLogo }: { loadingPage?: boolean, noLogo?: boolean }) {
    return (
        <div className='flex'>
            {/* {loadingPage
                ? <div className='flex flex-col justify-center items-center w-screen'>
                    <span className={styles.loaderPage} />
                    <div>
                        <Logo type="normal" />
                    </div>
                </div>
                : <span className={styles.loader} />
            } */}

            {loadingPage ?
                <div className='flex flex-col justify-center items-center w-screen h-screen'>
                    <span className={styles.loaderPage} />
                    <div>
                        <Logo type="normal" />
                    </div>
                </div>
                : noLogo ?
                    <div className='flex flex-col justify-center items-center w-screen'>
                        <span className={styles.loaderPage} />
                    </div>
                    : <span className={styles.loader} />}

        </div>
    )
}