
import styles from './not-found.module.css'

export default function not_found() {
  return (
    <>
            <div className={styles.main}>
                <div className={styles.moon}></div>
                <div className={` ${styles.moon__crater}  ${styles.moon__crater1} `}></div>
                <div className={`${styles.moon__crater} ${styles.moon__crater2} `}></div>
                <div className={` ${styles.moon__crater} ${styles.moon__crater3} `}></div>

                <div className={ ` ${styles.star} ${styles.star1} `}></div>
                <div className={ ` ${styles.star} ${styles.star2} `}></div>
                <div className={ ` ${styles.star} ${styles.star3} `}></div>
                <div className={ ` ${styles.star} ${styles.star4} `}></div>
                <div className={ ` ${styles.star} ${styles.star5} `}></div>

                    <div className={styles.error}>
                        <div className={styles.error__title}>404</div>
                        <div className={styles.error__subtitle}>Hmmm...</div>
                        <div className={styles.error__description}>It looks like you are lost...</div>
                        {/* <button className={` ${styles.error__button} ${styles.error__button} `}>LOGIN</button> */}
                        {/* <button className={styles.error__button}>CONTACT</button> */}
                    </div>

                    <div className={styles.astronaut}>
                        <div className={` ${styles.astronaut__backpack} `}></div>
                        <div className={` ${styles.astronaut__body} `}></div>
                        <div className={` ${styles.astronaut__body__chest} `}></div>
                        <div className={` ${styles.astronaut__arm_left1} `}></div>
                        <div className={` ${styles.astronaut__arm_left2} `}></div>
                        <div className={` ${styles.astronaut__arm_right1} `}></div>
                        <div className={` ${styles.astronaut__arm_right2} `}></div>
                        <div className={` ${styles.astronaut__arm_thumb_left} `}></div>
                        <div className={` ${styles.astronaut__arm_thumb_right} `}></div>
                        <div className={` ${styles.astronaut__leg_left} `}></div>
                        <div className={` ${styles.astronaut__leg_right} `}></div>
                        <div className={` ${styles.astronaut__foot_left} `}></div>
                        <div className={` ${styles.astronaut__foot_right} `}></div>
                        <div className={` ${styles.astronaut__wrist_left} `}></div>
                        <div className={` ${styles.astronaut__wrist_right} `}></div>
                        
                        {/* <div className={styles.astronaut__cord}>
                            <canvas id="cord" height="500px" width="500px"></canvas>
                        </div> */}
                        
                        <div className={styles.astronaut__head}>
                            <canvas id="visor" width="60px" height="60px" ></canvas>
                            <div className={styles.astronaut__head_visor_flare1}></div>
                            <div className={styles.astronaut__head_visor_flare2}></div>
                        </div>
                    </div>
            </div>
    </>
  )
}
