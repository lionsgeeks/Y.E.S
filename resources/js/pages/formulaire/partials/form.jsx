import { useEffect, useState } from "react";
import TransText from "@components/TransText";
import CountrySelect from "./countrySelect";
import Modal from "@components/Modal";
import axios from "axios";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const Form = () => {
    const { selectedLanguage, setSelectedLanguage } = "en";
const url = "https://management.youthempowermentsummit.africa/"
    // selects
    const [selectedPartner, setSelectedPartner] = useState('');
    const [otherPartner, setOtherPartner] = useState('');

    const [selectedFunders, setSelectedFunders] = useState('');
    const [otherFunders, setOtherFunders] = useState('');

    const [selectedFinancing, setSelectedFinancing] = useState('');
    const [otherFin, setOtherFin] = useState('')

    const [selectedArea, setSelectedArea] = useState('');
    const [regCountry, setRegCountry] = useState('');
    const [intCountry, setIntCountry] = useState('');
    const handleSelectChange = (event, setter) => {
        setter(event.target.value);
    };


    // files
    const [legal, setLegal] = useState();
    const [internal, setInternal] = useState();
    const [presentation, setPresentation] = useState();
    const [proDesc, setProDesc] = useState();
    const [fund, setFund] = useState();
    const [otherProj, setOtherProj] = useState()
    const [projEva, setProjEva] = useState()

    const handleFileChange = (e, setter) => {
        const MAX_SIZE = 10 * 1024 * 1024;
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.size > MAX_SIZE) {
                alert('File is too large. Max size is 10MB.');
            } else {
                setter(selectedFile);
            }
        }
    }

    // text 
    const [formData, setFormData] = useState({
        name_organization: '',
        name_representative: '',
        position_representative: '',
        phone_representative: '',
        email_representative: '',
        linkedin_representative: '',
        name_tenderer: '',
        position_tenderer: '',
        phone_tenderer: '',
        email_tenderer: '',
        linkedin_tenderer: '',
        years_existence: '',
        num_employees: '',
        num_volunteers: '',
        beneficiaries: '',
        neet_project_example: '',
        project_reach: '',
        project_impact: '',
        project_duration: '',
        project_area: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };



    const [sending, setSending] = useState(false);
    const [validate, setValidate] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (error) {
            setValidate(false);
            setSending(false);
            setConfirmation(true);
        }
        return () => {
            setError("");
        };
    }, [error]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setSending(true);
        setConfirmation(true);
        const allData = {
            ...formData,
            sources_funding: selectedFunding + " " + otherFunding,
            project_financing: selectedFinancing + " " + otherFin,
            themes_intervention: selectedThemes + " " + otherTheme,
            partners: selectedPartner == "no-partners" ? selectedPartner : selectedPartner + otherPartner,
            approached_funders: selectedFunders == "no-funders" ? selectedFunders : selectedFinancing + otherFunders,
            intervention_themes: selectedInterv + " " + otherInterv,
            area_intervention: selectedArea,
            country_registration: regCountry,
            country_intervention: intCountry,
            legal_statutes: legal,
            internal_regulations: internal,
            presentation: presentation,
            project_description: proDesc,
            funding_requirements: fund,
            project_evaluation: projEva,
            other_projects: otherProj,
        }

        const newForm = new FormData();
        Object.keys(allData).forEach(key => {
            newForm.append(key, allData[key]);
        });

        axios.post(url + '/api/formulaire', newForm).then((res) => {
            // the form text inputs
            setFormData(prevFormData => 
                Object.keys(prevFormData).reduce((acc, key) => {
                    acc[key] = '';
                    return acc;
                }, {})
            );
            // selects and their other
            setSelectedPartner('');
            setOtherPartner('');
            setSelectedFunders('');
            setOtherFunders('');
            setSelectedFinancing('');
            setOtherFin('');
            setSelectedArea('');
            setRegCountry('');
            setIntCountry('');

            // files
            setLegal();
            setInternal();
            setPresentation();
            setProDesc();
            setFund();
            setOtherProj();
            setProjEva();

            // checkboxes
            setConform(false);
            setAccepting(false);
            setSelectedThemes([]);
            setOtherTheme('');
            setSelectedInterv([]);
            setOtherInterv('');
            setSelectedFunding('');
            setOtherFunding('');

            // reset the tab
            setCurrentTab('General Information');

            setSending(false);
            setConfirmation(true);
            if (res.status === 200) {
                setValidate(true);
            } else {
                setValidate(false);
            }
        }).catch((err) => {
            console.log('form error', err);
            setError(err);
        })
    }

    const [currentTab, setCurrentTab] = useState('General Information');
    const formLanguages = [
        { language: "English", code: "en" },
        { language: "Français", code: "fr" },
        { language: "Portugais", code: "pr" },
        { language: "Arabic", code: "ar" },
        { language: "Swahili", code: "sw" },
    ];

    // Checkboxes
    const [conform, setConform] = useState(false)
    const [accepting, setAccepting] = useState(false)

    const [selectedThemes, setSelectedThemes] = useState([]);
    const [otherTheme, setOtherTheme] = useState('');

    const [selectedInterv, setSelectedInterv] = useState([]);
    const [otherInterv, setOtherInterv] = useState('');

    const [selectedFunding, setSelectedFunding] = useState('');
    const [otherFunding, setOtherFunding] = useState('');

    const fundingOptions = [
        {
            value: 'international-donors',
            label: (
                <TransText
                    en="International donors"
                    ar="المانحون الدوليون"
                    pr="Doadores internacionais"
                    sw="Wafadhili wa ndani"
                    fr="Bailleurs de fonds internationaux"
                />
            )
        },
        {
            value: 'domestic-funders',
            label: (
                <TransText
                    en="Domestic funders"
                    ar="الممولون المحليون"
                    pr="Financiadores domésticos"
                    sw="Wafadhili wa ndani"
                    fr="Financements nationaux"
                />
            )
        },
        {
            value: 'private-foundations',
            label: (
                <TransText
                    en="Private Foundations"
                    ar="المؤسسات الخاصة"
                    pr="Fundos privados"
                    sw="Misingi ya kibinafsi"
                    fr="Fondations privées"
                />
            )
        },
        {
            value: 'public-funds',
            label: (
                <TransText
                    en="Public funds"
                    ar="الأموال العامة"
                    pr="Fundos públicos"
                    sw="Mali za umma"
                    fr="Fonds publics"
                />
            )
        },
        {
            value: 'equity',
            label: (
                <TransText
                    en="Equity"
                    ar="الانصاف"
                    pr="Capital próprio"
                    sw="Usawa"
                    fr="Fonds propres"
                />
            )
        },
        {
            value: 'crowdfunding',
            label: (
                <TransText
                    en="Crowdfunding"
                    ar="التمويل الجماعي"
                    pr="Financiamento coletivo"
                    sw="Ufadhili wa umma"
                    fr="Financement participatif"
                />
            )
        },
        {
            value: 'other',
            label: (
                <TransText
                    en="Other (to be specified)"
                    ar="أخرى (يجب تحديدها)"
                    pr="Outro (a ser especificado)"
                    sw="Nyingine (itakayoelezewa)"
                    fr="Autre (à préciser)"
                />
            )
        }
    ];

    const themeOptions = [
        {
            value: 'accessibility-to-education',
            label: (
                <TransText
                    en="Accessibility to Education"
                    ar="الوصول إلى التعليم"
                    pr="Acessibilidade à Educação"
                    sw="Upatikanaji wa Elimu"
                    fr="Accessibilité à l'éducation"
                />
            )
        },
        {
            value: 'vocational-training',
            label: (
                <TransText
                    en="Vocational Training and Skills"
                    ar="التدريب المهني والمهارات"
                    pr="Formação profissional e habilidades"
                    sw="Mafunzo ya Ufundi na Ujuzi"
                    fr="Formation professionnelle et compétences"
                />
            )
        },
        {
            value: 'alternative-jobs',
            label: (
                <TransText
                    en="Alternative Jobs and Micro-entrepreneurship"
                    ar="وظائف بديلة وريادة الأعمال الصغيرة"
                    pr="Empregos alternativos e microempreendedorismo"
                    sw="Kazi mbadala na Ujasiriamali mdogo"
                    fr="Emplois alternatifs et micro-entrepreneuriat"
                />
            )
        },
        {
            value: 'mentoring-support',
            label: (
                <TransText
                    en="Mentoring and Support Initiatives"
                    ar="مبادرات الإرشاد والدعم"
                    pr="Iniciativas de mentoria e apoio"
                    sw="Mikakati ya Uelekezi na Msaada"
                    fr="Initiatives de mentorat et de soutien"
                />
            )
        },
        {
            value: 'social-inclusion',
            label: (
                <TransText
                    en="Social Inclusion and Equity"
                    ar="الاندماج الاجتماعي والعدالة"
                    pr="Inclusão social e equidade"
                    sw="Ujumuishaji wa Kijamii na Usawa"
                    fr="Inclusion sociale et équité"
                />
            )
        },
        {
            value: 'digital-technologies',
            label: (
                <TransText
                    en="Use of Digital Technologies"
                    ar="استخدام التقنيات الرقمية"
                    pr="Uso de tecnologias digitais"
                    sw="Matumizi ya Teknolojia za Kidigitali"
                    fr="Utilisation des technologies numériques"
                />
            )
        },
        {
            value: 'public-private-partnerships',
            label: (
                <TransText
                    en="Public-Private Partnerships"
                    ar="الشراكات بين القطاعين العام والخاص"
                    pr="Parcerias público-privadas"
                    sw="Ushirikiano wa Umma na Binafsi"
                    fr="Partenariats public-privé"
                />
            )
        },
        {
            value: 'gender-dynamics',
            label: (
                <TransText
                    en="Gender Dynamics and NEETs"
                    ar="ديناميات NEET"
                    pr="Dinâmicas de gênero e NEETs"
                    sw="Dinamika za Jinsia na NEETs"
                    fr="Dynamiques de genre et NEETs"
                />
            )
        },
        {
            value: 'community-mobilization',
            label: (
                <TransText
                    en="Community Mobilization"
                    ar="تح mobilization المجتمعية"
                    pr="Mobilização comunitária"
                    sw="Uhamasishaji wa Jamii"
                    fr="Mobilisation communautaire"
                />
            )
        },
        {
            value: 'migration-of-neet',
            label: (
                <TransText
                    en="Migration of NEET"
                    ar="هجرة NEET"
                    pr="Migração de NEET"
                    sw="Uhamaji wa NEET"
                    fr="Migration des NEET"
                />
            )
        },
        {
            value: 'other',
            label: (
                <TransText
                    en="Other"
                    ar="أخرى"
                    pr="Outro"
                    sw="Nyingine"
                    fr="Autre"
                />
            )
        }
    ];


    const handleCheckboxChange = (e, setter) => {
        const value = e.target.value;
        if (e.target.checked) {
            setter((prev) => [...prev, value]);
        } else {
            setter((prev) => prev.filter((item) => item !== value));
        }
    };


    const Required = () => {
        return (
            <>
                <span className="text-red-600 font-bold"> *</span>
            </>
        )
    }


    const generalBoolean = (
        [
            formData.name_organization,
            formData.name_representative,
            formData.position_representative,
            formData.phone_representative,
            formData.email_representative,
            formData.years_existence,
            formData.num_employees,
            formData.num_volunteers,
            formData.beneficiaries
        ].every(field => field.trim() !== '') &&

        regCountry.trim() &&

        legal && internal && presentation &&

        intCountry.trim() &&
        selectedArea.trim() &&

        selectedFunding.length > 0 &&
        selectedThemes.length > 0 &&
        (selectedFunding.includes('other') ? otherFunding : true) &&
        (selectedThemes.includes('other') ? otherTheme : true)
    );



    const projInfoBoolean = (
        proDesc && fund &&
        selectedFunders && selectedPartner &&
        selectedInterv.length > 0 &&
        (selectedInterv.includes('other') ? otherInterv.trim() : true) &&
        (selectedFunders === 'no-funders' ? true : otherFunders.trim()) &&
        (selectedPartner === 'no-partners' ? true : otherPartner.trim())
    )

    const prevProjBoolean = [
        formData.neet_project_example,
        formData.project_reach,
        formData.project_impact,
        formData.project_duration,
        formData.project_area,
    ].every(value => value.trim()) &&
        selectedFinancing &&
        (selectedFinancing !== 'other' || otherFin.trim());

    const isFormComplete = generalBoolean && projInfoBoolean && prevProjBoolean && conform && accepting;


    const newTab = [
        {
            title: 'General Information',
            text: <TransText en="General Information" ar="معلومات عامة" fr="Informations Générales" pr="Informações Gerais" sw="Taarifa za Jumla" />,
            bool: generalBoolean,
        },
        {
            title: 'Project Information',
            text: <TransText en="Project Information" ar="معلومات المشروع" fr="Informations sur le Projet" pr="Informações do Projeto" sw="Taarifa za Mradi" />,
            bool: projInfoBoolean
        },
        {
            title: 'Previous Projects',
            text: <TransText en="Previous Projects" ar="المشاريع السابقة" fr="Projets Précédents" pr="Projetos Anteriores" sw="Miradi ya Awali" />,
            bool: prevProjBoolean
        },
    ];
    return (

        <>
        <Navbar />
        <section className="p-4" >
            {true ? 
                    <div>
                        <div className="flex gap-3 items-center p-3 bg-gray-300">
                            {formLanguages.map(({ language, code }, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedLanguage(code)}
                                    className="bg-white py-2 w-[20%] rounded font-medium hover:bg-alpha hover:text-white"
                                >
                                    {language}
                                </button>
                            ))}
                        </div>
                        <form
                            dir={selectedLanguage == "ar" ? 'rtl' : 'ltr'}
                            onSubmit={handleSubmitForm}
                            className="flex flex-col gap-3 bg-gray-100/30 p-2">
                            <div className="w-full z-10 flex bg-gray-300 items-center gap-2 sticky top-[80px]">
                                {
                                    newTab.map((tab, index) => (
                                        <button type="button"
                                            key={index} className={`${tab.title == currentTab || tab.bool ? 'bg-alpha text-white' : 'text-black'} px-4 py-2 w-full rounded`}
                                            onClick={() => { tab.bool ? setCurrentTab(tab.title) : null }}
                                        >
                                            {tab.text}
                                        </button>
                                    ))
                                }
                            </div>
                            <div className={`flex flex-col gap-3 ${currentTab == "General Information" ? '' : 'hidden'}`}>
                                <div className="flex flex-col gap-1 w-full">
                                    <label className="font-[4px]" htmlFor="name_organization">
                                        <TransText
                                            en="Name of Organization"
                                            fr="Nom de l'organisation"
                                            ar="اسم المنظمة"
                                            sw="Jina la shirika"
                                            pr="Nome da Organização"
                                        /> <Required />
                                    </label>
                                    <input value={formData.name_organization} onChange={handleInputChange}
                                        className="border rounded p-2" type="text" name="name_organization" id="name_organization" required />
                                </div>

                                <h2 className="text-xl font-bold">
                                    <TransText
                                        en="Reprensetative"
                                        fr="Représentant Légal"
                                        ar="الممثل"
                                        pr="Representante Legal"
                                        sw="Mwakilishi wa kisheria"
                                    />
                                </h2>
                                <div className="flex items-center gap-4 justify-around flex-col lg:flex-row">

                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="font-[4px]" htmlFor="name_representative">
                                            <TransText
                                                en="Full Name of Legal Representative"
                                                pr="Nome e apelido do representante legal"
                                                sw="Jina na jina la mwakilishi wa kisheria"
                                                ar="الاسم الكامل للممثل القانوني"
                                                fr="Nom et prénom du représentant légal"
                                            /> <Required />
                                        </label>
                                        <input
                                            value={formData.name_representative} onChange={handleInputChange}
                                            className="border rounded p-2" type="text" name="name_representative" id="name_representative" required />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="position_representative">
                                            <TransText
                                                en="Position of Legal Representative"
                                                sw="Kazi ya mwakilishi wa kisheria"
                                                ar="منصب الممثل القانوني"
                                                fr="Fonction du représentant légal"
                                                pr="Posição do representante legal"
                                            /> <Required />
                                        </label>
                                        <input
                                            value={formData.position_representative} onChange={handleInputChange}
                                            className="border rounded p-2" type="text" name="position_representative" id="position_representative" required />
                                    </div>
                                </div>


                                <div className="flex items-start gap-2 justify-around flex-col lg:flex-row">

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="phone_representative">
                                            <TransText
                                                en="Telephone Number of Legal Representative"
                                                pr="Número de telefone do representante legal"
                                                sw="Nambari ya simu ya mwakilishi wa kisheria"
                                                ar="رقم هاتف الممثل القانوني"
                                                fr="Numéro de téléphone du représentant légal"
                                            /> <Required />
                                        </label>
                                        <input
                                            value={formData.phone_representative} onChange={handleInputChange}
                                            className="border rounded p-2" type="tel" name="phone_representative" id="phone_representative" required />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="email_representative">
                                            <TransText
                                                en="Email Address of Legal Representative"
                                                fr="Adresse email du représentant légal"
                                                sw="Anwani ya barua pepe ya mwakilishi wa kisheria"
                                                ar="عنوان البريد الإلكتروني للممثل القانوني"
                                                pr="Endereço de e-mail do representante legal"
                                            /> <Required />
                                        </label>
                                        <input
                                            value={formData.email_representative} onChange={handleInputChange}
                                            className="border rounded p-2" type="email" name="email_representative" id="email_representative" required />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="linkedin_representative">
                                            <TransText
                                                en="LinkedIn Profile of Legal Representative"
                                                pr="Link para o perfil do representante legal no LinkedIn"
                                                ar="رابط الملف الشخصي للممثل القانوني على موقع LinkedIn"
                                                sw="Unganisha kwenye wasifu wa LinkedIn wa mwakilishi wa kisheria"
                                                fr="Lien au profil LinkedIn du représentant légal"
                                            /> <Required />
                                        </label>
                                        <input
                                            value={formData.linkedin_representative} onChange={handleInputChange}
                                            className="border rounded p-2" type="url" name="linkedin_representative" id="linkedin_representative" />
                                    </div>
                                </div>



                                <h2 className="text-xl font-bold">
                                    <TransText
                                        en="Tenderer"
                                        fr="Soumissionnaire"
                                        ar="مقدّم العرض"
                                        pr="proponente"
                                        sw="mzabuni"
                                    />
                                </h2>

                                <div className="flex items-center gap-4 justify-around flex-col lg:flex-row">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="name_tenderer">
                                            <TransText
                                                en="Last Name and First Name of Tenderer (if other than legal representative)"
                                                fr="Nom et prénom du soumissionnaire (si autre que le représentant légal)"
                                                sw="Jina na jina la mzabuni (ikiwa ni zaidi ya mwakilishi wa kisheria)"
                                                ar="الاسم الكامل لمقدّم العرض (إذا كان غير الممثل القانوني)"
                                                pr="Apelido e nome próprio do proponente (se não for o representante legal)"
                                            />
                                        </label>
                                        <input
                                            value={formData.name_tenderer} onChange={handleInputChange}
                                            className="border rounded p-2" type="text" name="name_tenderer" id="name_tenderer" />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="position_tenderer">
                                            <TransText
                                                en="Tenderer's Position"
                                                pr="Posição do licitante "
                                                ar="منصب مقدّم العرض  "
                                                sw="Kazi ya mzabuni "
                                                fr="Fonction du soumissionnaire "
                                            />
                                        </label>
                                        <input
                                            value={formData.position_tenderer} onChange={handleInputChange}
                                            className="border rounded p-2" type="text" name="position_tenderer" id="position_tenderer" />
                                    </div>
                                </div>


                                <div className="flex items-center gap-4 justify-around flex-col lg:flex-row">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="phone_tenderer">
                                            <TransText
                                                en="Tenderer's Telephone Number"
                                                fr="Numéro de téléphone du soumissionnaire "
                                                sw="Nambari ya simu ya Bidder "
                                                ar="رقم هاتف مقدّم العرض"
                                                pr="Número de telefone do licitante "
                                            />
                                        </label>
                                        <input
                                            value={formData.phone_tenderer} onChange={handleInputChange}
                                            className="border rounded p-2" type="tel" name="phone_tenderer" id="phone_tenderer" />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="email_tenderer">
                                            <TransText
                                                en="Tenderer's Email Address"
                                                pr="Endereço de e-mail do licitante "
                                                ar="عنوان البريد الإلكتروني لمقدم العطاء "
                                                sw="Anwani ya barua pepe ya Bidder "
                                                fr="Adresse email du soumissionnaire "
                                            />
                                        </label>
                                        <input
                                            value={formData.email_tenderer} onChange={handleInputChange}
                                            className="border rounded p-2" type="email" name="email_tenderer" id="email_tenderer" />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="linkedin_tenderer">
                                            <TransText
                                                en="LinkedIn Profile of Tenderer"
                                                fr="Lien au profil LinkedIn du soumissionnaire"
                                                sw="Unganisha kwenye wasifu wa LinkedIn wa mzabuni"
                                                ar="رابط الملف الشخصي لمقدم العطاء على موقع LinkedIn"
                                                pr="Link para o perfil do licitante no LinkedIn"
                                            />
                                        </label>
                                        <input
                                            value={formData.linkedin_tenderer} onChange={handleInputChange}
                                            className="border rounded p-2" type="url" name="linkedin_tenderer" id="linkedin_tenderer" />
                                    </div>
                                </div>


                                <h2 className="text-xl font-bold mt-2">
                                    <TransText
                                        en="Other Information"
                                        fr="Autres Information"
                                        ar="معلومات"
                                    />
                                </h2>
                                <div className="flex items-center gap-4 justify-around flex-col lg:flex-row">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="years_existence">
                                            <TransText
                                                en="Years of Existence"
                                                pr="Anos de existência"
                                                ar="سنوات التواجد"
                                                sw="Miaka ya kuwepo"
                                                fr="Années d'existence"
                                            /> <Required />
                                        </label>
                                        <input
                                            value={formData.years_existence} onChange={handleInputChange}
                                            className="border rounded p-2" type="number" name="years_existence" id="years_existence" required />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="country_registration">
                                            <TransText
                                                en="Country of Legal Registration of Association"
                                                fr="Pays (d'enregistrement légal de l'association)"
                                                sw="Nchi (ya usajili wa kisheria wa chama)"
                                                ar="بلد (التسجيل القانوني للجمعية)"
                                                pr="País (de registo legal da associação)"
                                            /> <Required />
                                        </label>
                                        <select
                                            id="country_registration"
                                            className="border rounded p-2"
                                            value={regCountry}
                                            onChange={(e) => { handleSelectChange(e, setRegCountry) }}
                                            required
                                        >
                                            <option value="">Select an option</option>
                                            <CountrySelect />
                                        </select>
                                    </div>
                                </div>


                                <div className="flex items-center gap-4 justify-around flex-col lg:flex-row mt-4">

                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="relative">
                                            <input
                                                onChange={(e) => { handleFileChange(e, setLegal) }}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                type="file"
                                                accept="application/pdf"
                                                name="legal_statutes"
                                                id="legal_statutes"
                                                required
                                            />
                                            <label
                                                htmlFor="legal_statutes"
                                                className={`flex items-center gap-3 cursor-pointer border border-alpha/20 rounded p-2 ${legal ? 'bg-alpha text-white' : ''}`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                                </svg>
                                                <TransText
                                                    en="Legal Statutes"
                                                    pr="Estatutos Legais"
                                                    ar="الوضع القانوني"
                                                    fr="Statuts juridiques"
                                                    sw="Hali ya kisheria"
                                                /> <Required />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="relative">
                                            <input
                                                onChange={(e) => handleFileChange(e, setInternal)}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                type="file"
                                                accept="application/pdf"
                                                name="internal_regulations"
                                                id="internal_regulations"
                                                required
                                            />
                                            <label
                                                htmlFor="internal_regulations"
                                                className={`flex items-center gap-3 cursor-pointer border border-alpha/20 rounded p-2 ${internal ? 'bg-alpha text-white' : ''}`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                                </svg>
                                                <TransText
                                                    en="Internal Regulations"
                                                    pr="Regulamento Interno"
                                                    sw="Kanuni za utaratibu"
                                                    ar="اللوائح الداخلية"
                                                    fr="Règlement intérieur"
                                                />
                                                <Required />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="relative">
                                            <input
                                                onChange={(e) => handleFileChange(e, setPresentation)}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                type="file"
                                                accept="application/pdf"
                                                name="presentation" id="presentation"
                                                required
                                            />
                                            <label
                                                htmlFor="presentation"
                                                className={`flex items-center gap-3 cursor-pointer border border-alpha/20 rounded p-2 ${presentation ? 'bg-alpha text-white' : ''}`}                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                                </svg>
                                                <TransText
                                                    en="Presentation of the Association and its Activities"
                                                    fr="Présentation de l'association et ses activités (note pour inclure l'organigramme)"
                                                    ar="عرض تقديمي للجمعية وأنشطتها (ملاحظة لتضمين الهيكل التنظيمي)"
                                                    sw="Uwasilishaji wa chama na shughuli zake (kumbuka kujumuisha chati ya shirika)"
                                                    pr="Apresentação da associação e das suas atividades (nota a incluir organograma)"
                                                /> <Required />
                                            </label>
                                        </div>
                                    </div>
                                </div>




                                <div className="flex items-center gap-4 justify-around flex-col lg:flex-row">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="num_employees">
                                            <TransText
                                                en="Number of Employees"
                                                pr="Número de empregados"
                                                sw="Idadi ya wafanyakazi"
                                                ar="عدد الموظفين"
                                                fr="Nombre d'employés"
                                            /> <Required />
                                        </label>
                                        <input
                                            value={formData.num_employees} onChange={handleInputChange}
                                            className="border rounded p-2" type="number" name="num_employees" id="num_employees" required />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="num_volunteers">
                                            <TransText
                                                en="Number of Volunteers"
                                                fr="Nombre de volontaires"
                                                ar="عدد المتطوعين "
                                                sw="Idadi ya wafanyakazi wa kujitolea"
                                                pr="Número de voluntários "
                                            /> <Required />
                                        </label>
                                        <input
                                            value={formData.num_volunteers} onChange={handleInputChange}
                                            className="border rounded p-2" type="number" name="num_volunteers" id="num_volunteers" required />
                                    </div>
                                </div>


                                <div className="flex items-center gap-4 justify-around flex-col lg:flex-row">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="beneficiaries">
                                            <TransText
                                                en="Beneficiaries of Your Programs"
                                                pr="Beneficiários dos seus programas"
                                                sw="Wanufaika wa programu zako"
                                                ar="المستفيدون من برامجكم"
                                                fr="Bénéficiaires de vos programmes"
                                            /> <Required />
                                        </label>
                                        <input
                                            value={formData.beneficiaries} onChange={handleInputChange}
                                            className="border rounded p-2" name="beneficiaries" id="beneficiaries" required />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="country_intervention">
                                            <TransText
                                                en="Country of Intervention"
                                                fr="Pays d'intervention"
                                                ar="بلد التدخل"
                                                sw="Nchi ya kuingilia kati"
                                                pr="País de intervenção"
                                            /> <Required />
                                        </label>

                                        <select
                                            id="country_intervention"
                                            className="border rounded p-2"
                                            value={intCountry}
                                            onChange={(e) => { handleSelectChange(e, setIntCountry) }}
                                            required
                                        >
                                            <option value="">Select an option</option>
                                            <CountrySelect />
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="area_intervention">
                                            <TransText
                                                en="Area of Intervention"
                                                pr="Domínio de intervenção"
                                                sw="Mazingira ya kuingilia kati"
                                                ar="مجال التدخل"
                                                fr="Milieu d'intervention"
                                            /> <Required />
                                        </label>

                                        <select
                                            id="area_intervention"
                                            className="border rounded p-2"
                                            value={selectedArea}
                                            onChange={(e) => { handleSelectChange(e, setSelectedArea) }}
                                            required
                                        >
                                            <option value="">Select an option</option>
                                            <option value="urban">
                                                <TransText
                                                    en="Urban"
                                                    pr="Urbano"
                                                    sw="Mji"
                                                    ar="حضري"
                                                    fr="Urbain"
                                                />
                                            </option>
                                            <option value="peri-urban">
                                                <TransText
                                                    en="Peri-Urban"
                                                    pr="Peri-Urbano"
                                                    sw="Pembe za Mji"
                                                    ar="شبه حضري"
                                                    fr="Péri-Urbain"
                                                />
                                            </option>
                                            <option value="rural">
                                                <TransText
                                                    en="Rural"
                                                    pr="Rural"
                                                    sw="Kijijini"
                                                    ar="ريفي"
                                                    fr="Rural"
                                                />
                                            </option>
                                            <option value="all_three">
                                                <TransText
                                                    en="All three"
                                                    pr="Os três"
                                                    sw="Zote tatu"
                                                    ar="الجميع"
                                                    fr="Les trois"
                                                />
                                            </option>

                                        </select>
                                    </div>
                                </div>




                                <div className="flex flex-col gap-1">
                                    <label className="font-[4px]" htmlFor="sources_funding">
                                        <TransText
                                            en="Sources of Funding"
                                            fr="Sources de financement de l'association"
                                            ar="مصادر تمويل الجمعية"
                                            sw="Vyanzo vya fedha kwa ajili ya chama"
                                            pr="Fontes de financiamento da associação"
                                        /> <Required />
                                    </label>

                                    <div className="flex items-center gap-4 flex-wrap">
                                        {fundingOptions.map((option) => (
                                            <label key={option.value} className="block">
                                                <input
                                                    type="checkbox"
                                                    value={option.value}
                                                    checked={selectedFunding.includes(option.value)}
                                                    onChange={(e) => {
                                                        handleCheckboxChange(e, setSelectedFunding)
                                                    }}
                                                    className="mr-2"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    {selectedFunding.includes('other') && (
                                        <input
                                            type="text"
                                            className="border rounded p-2"
                                            placeholder="Please specify"
                                            onChange={(e) => setOtherFunding(e.target.value)}
                                            value={otherFunding}
                                            required
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col gap-1 mt-3">
                                    <label className="font-[4px]" htmlFor="themes_intervention">
                                        <TransText
                                            en="Themes of Intervention"
                                            pr="Tópicos de intervenção"
                                            sw="Mada ya kuingilia kati"
                                            ar="مواضيع التدخل"
                                            fr="Thématiques d'intervention"
                                        />:<Required />
                                    </label>
                                    <div className="flex items-center gap-4 flex-wrap">
                                        {themeOptions.map((option) => (
                                            <label key={option.value} className="block">
                                                <input
                                                    type="checkbox"
                                                    value={option.value}
                                                    checked={selectedThemes.includes(option.value)}
                                                    onChange={(e) => {
                                                        handleCheckboxChange(e, setSelectedThemes)
                                                    }}
                                                    className="mr-2"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    {selectedThemes.includes('other') && (
                                        <input
                                            type="text"
                                            className="border rounded p-2"
                                            placeholder="Please specify"
                                            onChange={(e) => setOtherTheme(e.target.value)}
                                            value={otherTheme}
                                            required
                                        />
                                    )}

                                </div>

                                <button disabled={!generalBoolean} className={`w-full py-3 rounded transition-all ${generalBoolean ? 'bg-alpha text-white ' : 'bg-gray-300 text-black/60'}`} type="button" onClick={() => setCurrentTab('Project Information')}>
                                    Next Section
                                </button>
                            </div>

                            <div className={`flex flex-col gap-2 ${currentTab == "Project Information" ? '' : 'hidden'}`}>

                                <div className="flex flex-col gap-1 w-full">
                                    <div className="relative">
                                        <input
                                            onChange={(e) => { handleFileChange(e, setProDesc) }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            type="file"
                                            accept="application/pdf"
                                            name="project_description" id="project_description"
                                            required
                                        />
                                        <label
                                            htmlFor="project_description"
                                            className={`flex items-center gap-3 cursor-pointer border border-alpha/20 rounded p-2 ${proDesc ? 'bg-alpha text-white' : ''}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                            </svg>
                                            <TransText
                                                en="Project Description (include target, activities, and impact)"
                                                pr="Descrição do projeto (incluir objetivo, atividades e impacto)"
                                                ar="وصف المشروع (بما في ذلك الهدف، الأنشطة والأثر)"
                                                fr="Description du projet (inclure ici cible, activités et impact)"
                                                sw="Maelezo ya mradi (pamoja na lengo hapa, shughuli na athari)"
                                            /><Required />
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 mt-3">

                                    <label className="font-[4px]" htmlFor="intervention_themes">
                                        <TransText
                                            en="Themes of Intervention"
                                            pr="Tópicos de intervenção"
                                            sw="Mada ya kuingilia kati"
                                            ar="مواضيع التدخل"
                                            fr="Thématiques d'intervention"
                                        />:<Required />
                                    </label>

                                    <div className="flex items-center gap-4 flex-wrap">
                                        {themeOptions.map((option) => (
                                            <label key={option.value} className="block">
                                                <input
                                                    type="checkbox"
                                                    value={option.value}
                                                    checked={selectedInterv.includes(option.value)}
                                                    onChange={(e) => {
                                                        handleCheckboxChange(e, setSelectedInterv)
                                                    }}
                                                    className="mr-2"
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    {selectedInterv.includes('other') && (
                                        <input
                                            type="text"
                                            className="border rounded p-2"
                                            placeholder="Please specify"
                                            onChange={(e) => setOtherInterv(e.target.value)}
                                            value={otherInterv}
                                            required
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <div className="relative">
                                        <input
                                            onChange={(e) => { handleFileChange(e, setFund) }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            type="file"
                                            name="funding_requirements" id="funding_requirements"
                                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                            required
                                        />
                                        <label
                                            htmlFor="funding_requirements"
                                            className={`flex items-center gap-3 cursor-pointer border border-alpha/20 rounded p-2 ${fund ? 'bg-alpha text-white' : ''}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                            </svg>
                                            <TransText
                                                en="Funding Requirements (budget)"
                                                fr="Besoins en financement (Budget)"
                                                ar="متطلبات التمويل (الميزانية)"
                                                sw="Mahitaji ya Fedha (Budget)"
                                                pr="Necessidades de financiamento (orçamento)"
                                            /> <Required />
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="font-[4px]" htmlFor="approached_funders">
                                        <TransText
                                            en="Have you already approached funders for this project? If so, can you name them?"
                                            ar="هل تواصلت بالفعل مع الممولين لهذا المشروع؟"
                                            pr="Já contactou financiadores para este projeto?"
                                            fr="Avez-vous déjà approché des bailleurs de fonds pour ce projet ?"
                                            sw="Je, tayari umewasiliana na wafadhili kwa ajili ya mradi huu?"
                                        /> <Required />
                                    </label>

                                    <select
                                        id="approached_funders"
                                        value={selectedFunders}
                                        onChange={(e) => { handleSelectChange(e, setSelectedFunders) }}
                                        className="border rounded p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="international-donors">International donors</option>
                                        <option value="domestic-funders">Domestic funders</option>
                                        <option value="private-foundations">Private Foundations</option>
                                        <option value="public-funds">Public funds</option>
                                        <option value="equity">Equity</option>
                                        <option value="crowdfunding">Crowdfunding</option>
                                        <option value="other">Other</option>
                                        <option value="no-funders">no-funders</option>
                                    </select>
                                    {(selectedFunders && selectedFunders !== "no-funders") && (
                                        <input
                                            type="text"
                                            placeholder="Please specify"
                                            className="border rounded p-2"
                                            onChange={(e) => setOtherFunders(e.target.value)}
                                            value={otherFunders}
                                            required
                                        />
                                    )}
                                </div>


                                <div className="flex flex-col gap-1">
                                    <label className="font-[4px]" htmlFor="partners">
                                        <TransText
                                            en="Do you have partners for this project? If yes, can you name them? (for each partner, include their involvement)"
                                            fr="Si Oui, pouvez-vous les nommer ? (pour chaque partenaire, inclure son intervention)"
                                            pr="Em caso afirmativo, pode nomeá-los? (para cada parceiro, por favor inclua a sua participação)"
                                            sw="Kama ni hivyo, unaweza kuwataja? (kwa kila mwenzi, jumuisha uingiliaji wao)"
                                            ar="إذا كانت الإجابة بنعم، هل يمكنك تسميتهم؟ (لكل شريك، ذكر مشاركته)"
                                        /><Required />
                                    </label>
                                    <select
                                        id="partners"
                                        value={selectedPartner}
                                        onChange={(e) => { handleSelectChange(e, setSelectedPartner) }}
                                        className="border rounded p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="public-institutions">Public institutions</option>
                                        <option value="private-institutions">Private Institutions</option>
                                        <option value="international-cooperation">International cooperation</option>
                                        <option value="other-associations">Other associations</option>
                                        <option value="other">Other</option>
                                        <option value="no-partners">no-partners</option>
                                    </select>
                                    {(selectedPartner && selectedPartner !== 'no-partners') && (
                                        <input
                                            type="text"
                                            placeholder="Please specify"
                                            className="border rounded p-2"
                                            onChange={(e) => setOtherPartner(e.target.value)}
                                            value={otherPartner}
                                            required
                                        />
                                    )}
                                </div>

                                <button disabled={!projInfoBoolean} className={`w-full py-3 rounded transition-all ${projInfoBoolean ? 'bg-alpha text-white ' : 'bg-gray-300 text-black/60'}`} type="button" onClick={() => setCurrentTab('Previous Projects')}>
                                    Next Section
                                </button>
                            </div>

                            <div className={`flex flex-col gap-2 ${currentTab == "Previous Projects" ? '' : 'hidden'}`}>
                                <div className="flex flex-col gap-1">
                                    <label className="font-[4px]" htmlFor="neet_project_example">
                                        <TransText
                                            en="Describe an example of a N.E.E.T. youth project you've carried out"
                                            ar="صف لنا مثالاً على مشروع قمت بتنفيذه وأثر على الشباب من ذوي الاحتياجات الخاصة"
                                            pr="Descreva um exemplo de um projeto que levou a cabo e que afetou os jovens da N.E.E.T."
                                            sw="Kama ni hivyo, unaweza kuwataja? (Kwa kila mwenzi, jumuisha uingiliaji wao)"
                                            fr="Décrire un exemple de projet ayant touché les jeunes N.E.E.T que vous avez réalisé"
                                        /><Required />
                                    </label>
                                    <textarea
                                        onChange={handleInputChange} required
                                        className="border rounded p-2" name="neet_project_example" id="neet_project_example"
                                        defaultValue={formData.neet_project_example}
                                        />
                                        {/* {formData.neet_project_example} */}
                                    {/* </textarea> */}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="font-[4px]" htmlFor="project_reach">
                                        <TransText
                                            en="How many people did this project reach?"
                                            ar="كم عدد الأشخاص الذين استفادوا من هذا المشروع؟"
                                            fr="Combien de personnes ce projet a-t-il touché ?"
                                            sw="Mradi huu umefikia watu wangapi?"
                                            pr="Quantas pessoas beneficiaram deste projeto?"
                                        /><Required />
                                    </label>
                                    <input
                                        value={formData.project_reach} onChange={handleInputChange} required
                                        className="border rounded p-2" type="number" name="project_reach" id="project_reach" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="font-[4px]" htmlFor="project_impact">
                                        <TransText
                                            en="What was the direct impact on the beneficiaries of this project?"
                                            pr="Qual foi o impacto direto nos beneficiários deste projeto?"
                                            sw="Je, ni athari gani za moja kwa moja kwa walengwa wa mradi huu?"
                                            fr="Quel a été l'impact direct sur les bénéficiaires de ce projet ?"
                                            ar="ما هو التأثير المباشر على المستفيدين من هذا المشروع؟"
                                        /><Required />
                                    </label>
                                    <textarea
                                        onChange={handleInputChange} required
                                        className="border rounded p-2" name="project_impact" id="project_impact"
                                        defaultValue={formData.project_impact}
                                        />
                                        {/* {formData.project_impact} */}
                                    {/* </textarea> */}
                                </div>

                                <div className="flex items-center gap-4 justify-around flex-col lg:flex-row">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="project_duration">
                                            <TransText
                                                en="How long did the project last?"
                                                fr="Quelle a été la durée du projet ?"
                                                ar="ما المدة التي استغرقها المشروع؟"
                                                sw="Mradi huu ulichukua muda gani?"
                                                pr="Quanto tempo durou o projeto?"
                                            /><Required />
                                        </label>
                                        <input
                                            value={formData.project_duration} onChange={handleInputChange} required
                                            className="border rounded p-2" type="text" name="project_duration" id="project_duration" />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="font-[4px]" htmlFor="project_area">
                                            <TransText
                                                en="What was the project's area of intervention?"
                                                pr="Que área foi abrangida pelo projeto?"
                                                sw="Je, ni eneo gani la kuingilia kati kwa mradi huu?"
                                                ar="ما هي المنطقة التي غطاها المشروع؟"
                                                fr="Quelle a été la zone d'intervention de ce projet ?"
                                            /><Required />
                                        </label>
                                        {/* todo select countries */}
                                        <input
                                            value={formData.project_area} onChange={handleInputChange} required
                                            className="border rounded p-2" type="text" name="project_area" id="project_area" />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-1">
                                    <label className="font-[4px]" htmlFor="project_financing">
                                        <TransText
                                            en="How did you finance this project?"
                                            fr="Comment vous avez financé ce projet ?"
                                            ar="كيف تم تمويل هذا المشروع؟"
                                            sw="Ni kwa namna gani umeufadhili mradi huu?"
                                            pr="Como foi financiado este projeto?"
                                        /><Required />
                                    </label>

                                    <select
                                        id="project_financing"
                                        value={selectedFinancing}
                                        onChange={(e) => { handleSelectChange(e, setSelectedFinancing) }}
                                        className="border rounded p-2" required
                                    >
                                        <option value="">Select an option</option>
                                        <option value="international-donors">
                                            <TransText
                                                en="International donors"
                                                ar="المانحون الدوليون"
                                                pr="Doadores internacionais"
                                                sw="Wafadhili wa ndani"
                                                fr="Bailleurs de fonds internationaux"
                                            />
                                        </option>
                                        <option value="domestic-funders">
                                            <TransText
                                                en="Domestic funders"
                                                ar="الممولون المحليون"
                                                pr="Financiadores domésticos"
                                                sw="Wafadhili wa ndani"
                                                fr="Financements nationaux"
                                            />
                                        </option>
                                        <option value="private-foundations">
                                            <TransText
                                                en="Private Foundations"
                                                ar="المؤسسات الخاصة"
                                                pr="Fundos privados"
                                                sw="Misingi ya kibinafsi"
                                                fr="Fondations privées"
                                            />
                                        </option>
                                        <option value="public-funds">
                                            <TransText
                                                en="Public funds"
                                                ar="الأموال العامة"
                                                pr="Fundos públicos"
                                                sw="Mali za umma"
                                                fr="Fonds publics"
                                            />
                                        </option>
                                        <option value="equity">
                                            <TransText
                                                en="Equity"
                                                ar="الانصاف"
                                                pr="Capital próprio"
                                                sw="Usawa"
                                                fr="Fonds propres"
                                            />
                                        </option>
                                        <option value="crowdfunding">
                                            <TransText
                                                en="Crowdfunding"
                                                ar="التمويل الجماعي"
                                                pr="Financiamento coletivo"
                                                sw="Ufadhili wa umma"
                                                fr="Financement participatif"
                                            />
                                        </option>
                                        <option value="other">
                                            <TransText
                                                en="Other (to be specified)"
                                                ar="أخرى (يجب تحديدها)"
                                                pr="Outro (a ser especificado)"
                                                sw="Nyingine (itakayoelezewa)"
                                                fr="Autre (à préciser)"
                                            />
                                        </option>

                                    </select>
                                    {selectedFinancing === 'other' && (
                                        <input
                                            type="text"
                                            className="border rounded p-2" required
                                            onChange={(e) => setOtherFin(e.target.value)}
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <div className="relative">
                                        <input
                                            onChange={(e) => { handleFileChange(e, setProjEva) }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            type="file"
                                            accept="application/pdf"
                                            name="project_evaluation" id="project_evaluation"
                                        />
                                        <label
                                            htmlFor="project_evaluation"
                                            className={`flex items-center gap-3 cursor-pointer border border-alpha/20 rounded p-2 ${projEva ? 'bg-alpha text-white' : ''}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                            </svg>
                                            <TransText
                                                en="Project evaluation report (if applicable)"
                                                pr="Relatório de avaliação do projeto (se aplicável)"
                                                sw="Ripoti ya Tathmini ya Mradi (ikiwa inafaa)"
                                                ar="تقرير تقييم المشروع (إن أمكن)"
                                                fr="Rapport d'évaluation du projet (si applicable)"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <div className="relative">
                                        <input
                                            onChange={(e) => { handleFileChange(e, setOtherProj) }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            type="file"
                                            accept="application/pdf"
                                            name="other_projects" id="other_projects"
                                        />
                                        <label
                                            htmlFor="other_projects"
                                            className={`flex items-center gap-3 cursor-pointer border border-alpha/20 rounded p-2 ${otherProj ? 'bg-alpha text-white' : ''}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                            </svg>
                                            <TransText
                                                en="Would you like to share other projects targeting young people?"
                                                fr="Voulez-vous partager d'autres projets ayant pour cible les jeunes ?"
                                                sw="Je, ungependa kushiriki miradi mingine inayolenga vijana?"
                                                pr="Gostaria de partilhar outros projetos destinados aos jovens?"
                                                ar="هل ترغب في مشاركة مشاريع أخرى تستهدف الشباب؟"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <hr />
                            {
                                generalBoolean && projInfoBoolean && prevProjBoolean && <div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            checked={conform}
                                            onChange={() => { setConform(!conform) }}
                                            type="checkbox" name="conform" id="conform" required />
                                        <label className="font-[4px]" htmlFor="conform">
                                            <TransText
                                                en="By checking this box, I certify the conformity of the information provided."
                                                ar="بالتأشير على هذا المربع، أقر بأن المعلومات المقدمة صحيحة."
                                                pr="Ao assinalar esta casa, certifico que as informações prestadas estão corretas. "
                                                sw="Kwa kuweka sanduku hili, ninathibitisha kufuata habari iliyotolewa"
                                                fr="En cochant cette case, je certifie la conformité des informations fournies"
                                            /><Required />

                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            checked={accepting}
                                            onChange={() => { setAccepting(!accepting) }}
                                            type="checkbox" name="accepting" id="accepting" required />
                                        <label className="font-[4px]" htmlFor="accepting">
                                            <TransText
                                                en="I undertake to provide the necessary time to prepare my NGO's participation in Y.E.S Africa."
                                                fr="Je m'engage à fournir le temps nécessaire pour la préparation de la participation de mon ONG à Y.E.S Africa"
                                                sw="Ninaahidi kutoa muda muhimu kwa ajili ya maandalizi ya ushiriki wa NGO yangu katika Y.E.S Africa"
                                                pr="Comprometo-me a dedicar algum tempo a preparar a participação da minha ONG na Y.E.S Africa."
                                                ar="أتعهد بتوفير الوقت اللازم لإعداد مشاركة منظمتي غير الحكومية في برنامج Y.E.S أفريقيا."
                                            /> <Required />
                                        </label>
                                    </div>
                                </div>
                            }

                            {
                                isFormComplete && <button disabled={sending} className={`w-full py-3 rounded transition-all bg-alpha text-white`} type="submit">


                                    {
                                        sending ?
                                            <div role="status" className="flex items-center justify-center">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            :
                                            <>
                                                Submit Form
                                            </>
                                    }
                                </button>
                            }
                        </form>
                    </div>
                    :
                    <div className="h-[75vh] bg-gray-100 rounded-xl flex items-center justify-center flex-col">

                        <svg
                            id="Layer_2"
                            data-name="Layer 2"
                            className="w-[40%] animate-bounce"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 797.35 234.47"
                        >
                            <g>
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M321.04,54.5v18.17h-9.43v-18.17l-18.09-30.37h10.33l12.48,21.98,12.55-21.98h10.26l-18.09,30.37Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M371.72,55.12c0,10.26-7.97,18.44-18.58,18.44s-18.51-8.18-18.51-18.44,7.97-18.44,18.51-18.44,18.58,8.11,18.58,18.44ZM362.7,55.12c0-5.48-3.68-9.98-9.57-9.98s-9.5,4.51-9.5,9.98,3.68,9.98,9.5,9.98,9.57-4.51,9.57-9.98Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M409.84,37.51v35.15h-8.81v-4.3c-1.94,2.91-5.06,5.2-10.19,5.2-8.87,0-12.9-7.21-12.9-14.63v-21.42h8.81v19.55c0,4.51,1.87,7.9,6.8,7.9,5.27,0,7.49-3.81,7.49-7.9v-19.55h8.81Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M429.19,45.56v12.83c0,4.02.55,6.38,5.41,6.38.62,0,1.46-.07,2.08-.14v8.04c-.9.28-1.87.48-3.68.48-9.01,0-12.62-6.03-12.62-13.31v-14.28h-4.99v-8.04h4.99v-7.35h8.81v7.35h7.49v8.04h-7.49Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M475.85,51.31v21.35h-8.81v-19.55c0-4.51-1.87-7.9-6.86-7.9s-7.49,3.88-7.49,7.9v19.55h-8.74V24.13h8.74v17.68c1.94-2.84,5.13-5.13,10.26-5.13,8.87,0,12.89,7.21,12.89,14.63Z"
                                />
                            </g>
                            <g>
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M330.64,132.9v8.74h-28.64v-48.53h28.01v8.74h-18.65v10.95h17.06v8.74h-17.06v11.37h19.28Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M388.6,119.65v21.98h-8.81v-20.18c0-4.37-1.8-7.28-5.89-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-20.18c0-4.37-1.8-7.28-5.9-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-35.15h8.81v3.74c1.8-2.57,4.65-4.57,9.29-4.57s7.9,2.22,9.71,5.54c2.15-3.12,5.62-5.54,10.61-5.54,8.11,0,12.27,6.59,12.27,14Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M434.07,124.09c0,9.22-6.24,18.44-17.19,18.44-5.41,0-8.94-2.15-11.16-4.99v17.47h-8.81v-48.53h8.81v4.16c2.22-2.91,5.76-4.99,11.16-4.99,10.95,0,17.19,9.22,17.19,18.44ZM425.06,124.09c0-5.41-3.47-9.98-9.5-9.98s-9.5,4.58-9.5,9.98,3.4,9.98,9.5,9.98,9.5-4.58,9.5-9.98Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M475.32,124.09c0,10.26-7.97,18.44-18.58,18.44s-18.51-8.18-18.51-18.44,7.97-18.44,18.51-18.44,18.58,8.11,18.58,18.44ZM466.31,124.09c0-5.48-3.68-9.98-9.57-9.98s-9.5,4.51-9.5,9.98,3.68,9.98,9.5,9.98,9.57-4.51,9.57-9.98Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M530.37,106.48l-11.79,35.15h-7.83l-7.07-20.73-7,20.73h-7.83l-11.79-35.15h9.5l6.73,22.32,7.56-22.32h5.76l7.49,22.32,6.79-22.32h9.5Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M567.53,127.49h-26.07c1.25,4.72,5.13,7.21,9.98,7.21,4.02,0,6.79-2.15,7.83-3.47l7.07,4.16c-2.84,3.95-8.25,7.14-14.91,7.14-11.65,0-19.34-7.76-19.34-18.44s8.25-18.44,17.96-18.44c10.61,0,19.07,7.97,17.47,21.84ZM558.93,120.69c-.9-4.58-4.02-7.21-8.74-7.21-4.3,0-7.7,2.7-8.74,7.21h17.47Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M594.49,105.65v9.57c-10.4-1.25-11.72,5.41-11.72,11.92v14.49h-8.81v-35.15h8.81v5.75c2.63-4.37,7.49-6.59,11.72-6.59Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M633.39,127.49h-26.07c1.25,4.72,5.13,7.21,9.98,7.21,4.02,0,6.79-2.15,7.83-3.47l7.07,4.16c-2.84,3.95-8.25,7.14-14.91,7.14-11.65,0-19.34-7.76-19.34-18.44s8.25-18.44,17.96-18.44c10.61,0,19.07,7.97,17.47,21.84ZM624.79,120.69c-.9-4.58-4.02-7.21-8.74-7.21-4.3,0-7.7,2.7-8.74,7.21h17.47Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M690.51,119.65v21.98h-8.81v-20.18c0-4.37-1.8-7.28-5.89-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-20.18c0-4.37-1.8-7.28-5.9-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-35.15h8.81v3.74c1.8-2.57,4.65-4.57,9.29-4.57s7.9,2.22,9.71,5.54c2.15-3.12,5.62-5.54,10.61-5.54,8.11,0,12.27,6.59,12.27,14Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M732.18,127.49h-26.07c1.25,4.72,5.13,7.21,9.98,7.21,4.02,0,6.79-2.15,7.83-3.47l7.07,4.16c-2.84,3.95-8.25,7.14-14.91,7.14-11.65,0-19.34-7.76-19.34-18.44s8.25-18.44,17.96-18.44c10.61,0,19.07,7.97,17.47,21.84ZM723.58,120.69c-.9-4.58-4.02-7.21-8.74-7.21-4.3,0-7.7,2.7-8.74,7.21h17.47Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M770.52,120.28v21.35h-8.81v-19.55c0-4.51-1.87-7.9-6.86-7.9s-7.49,3.88-7.49,7.9v19.55h-8.74v-35.15h8.74v4.3c1.94-2.84,5.13-5.13,10.26-5.13,8.87,0,12.89,7.21,12.89,14.63Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M789.86,114.52v12.83c0,4.02.55,6.38,5.41,6.38.62,0,1.46-.07,2.08-.14v8.04c-.9.28-1.87.48-3.68.48-9.01,0-12.62-6.03-12.62-13.31v-14.28h-4.99v-8.04h4.99v-7.35h8.81v7.35h7.49v8.04h-7.49Z"
                                />
                            </g>
                            <g>
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M336.25,197.63c0,7.56-5.41,14.98-18.1,14.98-9.08,0-17.2-3.74-19.55-11.79l9.08-2.84c.69,2.77,3.61,6.38,10.4,6.38,4.85,0,8.74-1.87,8.74-6.03,0-4.85-5.48-5.2-13.17-7.07-9.78-2.43-13.03-7.35-13.03-14.07,0-9.15,7-14.84,17.12-14.84,8.11,0,14.49,4.02,16.57,11.44l-9.15,2.22c-.55-2.57-3.05-5.41-7.9-5.41-4.02,0-7.35,2.08-7.35,5.96,0,5.48,6.17,6.24,10.68,7.28,11.51,2.63,15.67,5.96,15.67,13.8Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M374.03,176.56v35.15h-8.81v-4.3c-1.94,2.91-5.06,5.2-10.19,5.2-8.87,0-12.9-7.21-12.9-14.63v-21.42h8.81v19.55c0,4.51,1.87,7.9,6.8,7.9,5.27,0,7.49-3.81,7.49-7.9v-19.55h8.81Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M433.03,189.73v21.98h-8.81v-20.18c0-4.37-1.8-7.28-5.89-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-20.18c0-4.37-1.8-7.28-5.9-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-35.15h8.81v3.74c1.8-2.57,4.65-4.57,9.29-4.57s7.9,2.22,9.71,5.54c2.15-3.12,5.62-5.54,10.61-5.54,8.11,0,12.27,6.59,12.27,14Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M492.03,189.73v21.98h-8.81v-20.18c0-4.37-1.8-7.28-5.89-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-20.18c0-4.37-1.8-7.28-5.9-7.28s-6.24,3.26-6.24,7.28v20.18h-8.81v-35.15h8.81v3.74c1.8-2.57,4.65-4.57,9.29-4.57s7.9,2.22,9.71,5.54c2.15-3.12,5.62-5.54,10.61-5.54,8.11,0,12.27,6.59,12.27,14Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M500.07,166.71c0-2.57,2.08-4.65,4.64-4.65s4.72,2.08,4.72,4.65-2.08,4.71-4.72,4.71-4.64-2.08-4.64-4.71ZM500.34,176.56h8.81v35.15h-8.81v-35.15Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M528.49,184.6v12.83c0,4.02.55,6.38,5.41,6.38.62,0,1.46-.07,2.08-.14v8.04c-.9.28-1.87.48-3.68.48-9.01,0-12.62-6.03-12.62-13.31v-14.28h-4.99v-8.04h4.99v-7.35h8.81v7.35h7.49v8.04h-7.49Z"
                                />
                            </g>
                            <g>
                                <path
                                    className="fill-[#b09417] stroke-0"
                                    d="M17.71,28.34L43.74,3.51c.61-.58,1.41-.93,2.25-.98L90.03,0c.93-.05,1.84.26,2.54.87l19.67,17.09c1.67,1.45,4.25,1.04,5.38-.85l.98-1.63c.69-1.15,1.96-1.81,3.29-1.72l29.77,2.02c1.08.07,2.08.64,2.69,1.53l43.13,62.79c.61.89,1.59,1.45,2.67,1.53l10.2.76c2.62.2,4.14,3.07,2.81,5.35l-31.46,53.71c-.42.71-.57,1.55-.44,2.36l3.73,23.1c.21,1.33-.34,2.66-1.43,3.45l-17.74,12.81c-.66.48-1.14,1.17-1.35,1.95l-4.77,17.58c-.21.76-.66,1.43-1.29,1.91l-38.67,29.13c-1.68,1.27-4.09.8-5.18-1l-14.66-24.19c-.27-.45-.44-.96-.5-1.48l-6.66-65.5c-.07-.67-.32-1.3-.74-1.83l-12.64-16.18c-.63-.81-.88-1.85-.69-2.86l1.14-5.97c.43-2.26-1.36-4.32-3.66-4.22l-43.52,2c-1.03.05-2.02-.35-2.73-1.1L.99,81.21c-.69-.72-1.05-1.7-.98-2.7l2.1-31.19c.05-.78.36-1.51.87-2.1l14.51-16.66c.07-.08.15-.16.23-.24Z"
                                />
                                <path
                                    className="fill-[#b09417] stroke-0"
                                    d="M199.52,178.4l-13.14,7.71c-.72.42-1.27,1.09-1.55,1.88l-2.17,6.11c-.28.79-.27,1.66.03,2.45l.92,2.44c.44,1.15.24,2.45-.51,3.43l-2.98,3.86c-.6.78-.85,1.77-.7,2.74l1.4,8.64c.26,1.63,1.61,2.86,3.25,2.98l7.71.56c1.5.11,2.91-.73,3.51-2.11l12.86-29.09c.33-.74.39-1.56.19-2.34l-2.33-8.88c-.69-2.63-3.96-3.55-5.92-1.65h0"
                                />
                            </g>
                            <g>
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M207.88,128.76c3.87-25.54-11.91-48.98-36.43-51.74l.35,9.5c-20.2-.94-33.2,14.23-43.41,32.69,4.49,12.29,7.78,24.99,9.82,37.86,17.17,15.11,52.21,14.19,66.27-5.97l-12.8-8.19c-4.85,6.41-14.25,9.82-22.68,9.73-16.89,0-27.47-9.73-29.86-23.88h68.75ZM139.13,115.44c4.45-31.37,49.42-33.01,53.06,0h-53.06Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M250.38,115.1c-9.89-2.05-21.83-2.74-21.83-12.45,0-7.16,6.31-11.94,14.84-11.94,9.73,0,14.84,5.11,16.37,9.89l14.5-3.93c-3.06-12.79-15.52-19.96-29.51-19.96-18.77,0-31.91,11.25-31.91,27.12.18,34.64,49.06,18.16,49.65,37.02,0,7.68-6.31,12.28-17.57,12.28-13.99,0-18.61-6.14-19.97-10.57l-15.18,5.11c3.41,12.97,17.74,19.78,34.8,19.78,23.03,0,33.95-12.79,33.95-28.15,0-12.96-6.99-19.78-28.15-24.22Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M166.76,81.82c-20.16,1.21-33.63,18.23-43.71,37.01,5.47,14.45,9.26,29.61,11.21,44.97l-15.09,1.91c-1.15-9.08-2.99-18.03-5.49-26.8-8.31,21.1-12.65,43.67-12.71,66.45-2.88,0-12.17-.04-15.2-.05.08-30.22,7.14-60.25,20.57-87.33-11.56-26.29-35.91-69.08-67.74-66.73l-1.33-15.16c36.87-2.88,62.85,34.89,78.27,65.42,11.64-19.04,29.49-34.1,50.67-34.89.16,4.51.38,10.68.55,15.19Z"
                                />
                                <path
                                    className="fill-[#2e539d] stroke-0"
                                    d="M132.86,58.95c1.48,9.53-6.62,17.64-16.16,16.16-18.24-3.69-14.12-29.95,4.45-27.81,5.93.89,10.78,5.72,11.71,11.65Z"
                                />
                            </g>
                        </svg>

                        <h1 className="text-xl font-semibold">Your Request is Being Submitted</h1>
                        <p className="ellipsis-animation text-lg"></p>
                    </div>
            }


            {!sending && confirmation && (
                <Modal
                    validate={validate}
                    confirm={confirmation}
                    action={
                        <button
                            onClick={() => {
                                setConfirmation(false);
                            }}
                            className="px-5 py-2 font-medium bg-alpha rounded text-white"
                        >
                            Close
                        </button>
                    }
                />
            )}

        </section>
        <Footer/>
        </>
    )
}

export default Form;
