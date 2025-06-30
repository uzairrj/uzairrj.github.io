import './pageContainer.css';
import Header from './header';

function PageContainer({children}: {children: React.ReactNode}) {
    return (
        <>
            <Header />
            <div className="page-container">
                {children}
            </div>
        </>
    )
}

export default PageContainer;
