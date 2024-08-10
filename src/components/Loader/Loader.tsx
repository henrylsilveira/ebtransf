import { Logo } from '../Logo'
import styles from './styles.module.css'
export function Loader({ loadingPage }: { loadingPage?: boolean }) {
    return (
        <div className='flex'>
            {loadingPage
                ? <div className='flex flex-col justify-center items-center w-screen'>
                    <span className={styles.loaderPage} />
                    <div>
                        <Logo type="normal" />
                    </div>
                </div>

                : <span className={styles.loader} />}
        </div>
    )
}