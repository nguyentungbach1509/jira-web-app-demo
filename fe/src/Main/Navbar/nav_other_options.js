import {MdOutlineNewReleases, MdOutlineFilterList, MdOutlineFindInPage} from 'react-icons/md';
import {TbFileReport, TbComponents} from 'react-icons/tb';
import Option from './Options/options';
import './nav_other_options.css';

const options = [
    {
        component: MdOutlineNewReleases,
        text: "Release"
    },
    {
        component: MdOutlineFilterList,
        text: "Issuses and filter"
    },
    {
        component: MdOutlineFindInPage,
        text: "Pages"
    },
    {
        component: TbFileReport,
        text: "Reports"
    },
    {
        component: TbComponents,
        text: "Components"
    }
]

function OtherOptions () {
    return (
        <div className="options__container">
            {options.map((op, i) => (
                <Option key={i} Component={op.component} text={op.text}/>
            ))}
        </div>
    )
}

export default OtherOptions;