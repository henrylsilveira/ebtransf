import styles from './styles.module.css'
export function Loader({ loadingPage }: { loadingPage?: boolean}){
    return (
        <div className='flex'>
            {loadingPage 
            ? <span className={styles.loaderPage} /> 
            : <span className={styles.loader} />}
        </div>
    ) 
}