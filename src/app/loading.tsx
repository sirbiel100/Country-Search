import style from "./loading.module.sass"

export default function Loading() {
    return (
        <div className={style.capybaraloader}>
            <div className={style.capybara}>
                <div className={style.capyhead}>
                    <div className={style.capyear}>
                        <div className={style.capyear2}></div>
                    </div>
                    <div className={style.capyear}></div>
                    <div className={style.capymouth}>
                        <div className={style.capylips}></div>
                        <div className={style.capylips}></div>
                    </div>
                    <div className={style.capyeye}></div>
                    <div className={style.capyeye}></div>
                </div>
                <div className={style.capyleg}></div>
                <div className={style.capyleg2}></div>
                <div className={style.capyleg2}></div>
                <div className={style.capy}></div>
            </div>
            <div className={style.loader}>
                <div className={style.loaderline}></div>
            </div>
        </div>

    )
}