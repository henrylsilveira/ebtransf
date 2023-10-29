import styles from './styles.module.css'
export function Loader(){
    return (
        <div className='flex'>
            <span className={styles.loader} />
        </div>
    ) 
}