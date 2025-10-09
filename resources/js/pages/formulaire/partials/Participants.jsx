import React, { useState } from 'react';
import TransText from "@components/TransText";
// import { useAppContext } from '../../../context/AppContext';
import axios from 'axios';
import CountrySelect from './countrySelect';
import { useEffect } from 'react';
import Modal from '@components/Modal';

const Participants = () => {

    const { selectedLanguage, setSelectedLanguage } = "en";
    const url = "https://management.youthempowermentsummit.africa/"

    // ? POST FUNC

    const [data, setData] = useState({
        civility: "",
        name: "",
        organisation: "",
        category: "",
        position: "",
        mail: "",
        phone: "",
        country: "",
    })

    const [logo, setLogo] = useState();

    // console.log(data);


    const [otherCount, setOtherCount] = useState("");
    const [isOtherChoosed, setIsOtherChoosed] = useState(false)

    useEffect(() => {
        if (data.country == "other") {
            setIsOtherChoosed(true)
        } else {
            setIsOtherChoosed(false)
        }
    }, [data.country])

    let isFormFull = Object.keys(data).every((e) => data[e].trim() !== "") && (data.country == "other" ? otherCount.trim() : true) && logo
    // const [isFormFull,setIsFormFull] = useState(Object.keys(data).every((e)=>data[e].trim() !== ""))

    // console.log(isFormFull);

    const [isLoading, setIsLoading] = useState(false)

    const [isSentSuc, setIsSentSuc] = useState(false);

    const HandleChange = (e) => {
        const value = e.target.value;

        setData({
            ...data,
            [e.target.name]: value
        })
    }

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

    const HandleSubmit = async (e) => {
        if (isLoading) return

        setIsLoading(true)

        e.preventDefault();

        const formData = new FormData();

        // Append non-file fields
        formData.append('civility', data.civility);
        formData.append('name', data.name);
        formData.append('organisation', data.organisation);
        formData.append('category', data.category);
        formData.append('position', data.position);
        formData.append('mail', data.mail);
        formData.append('phone', data.phone);
        formData.append('country', data.country);
        formData.append('otherCount', otherCount);
        formData.append('logo', logo);



        try {
            const response = await axios.post(url + "/api/participants", formData)
            console.log(response);
            if (response.status == 200) {
                setIsSentSuc(true)
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            // setData({
            //     civility: "",
            //     name: "",
            //     organisation: "",
            //     category: "",
            //     position: "",
            //     mail: "",
            //     phone: "",
            //     country: "",
            // })
            // setIsLoading(false)
            // setOtherCount("")
            // setLogo('')
        }
    }
    const closeBtn = () => {
        return <>
            <button className='bg-alpha px-5 py-2 hover:bg-alpha/80 text-white rounded-lg' onClick={() => { setIsSentSuc(false) }}>close</button>
        </>
    }
    return (
        <div>
            {
                isSentSuc &&
                <Modal confirm={isSentSuc} validate={true} action={closeBtn()} />
            }
            <div dir={selectedLanguage == "ar" && "rtl"} className="w-full flex justify-center ">
                <div className="relative lg:py-20 py-12 flex lg:flex-row flex-col justify-between w-[100%] lg:px-10 px-3 lg:gap-0 gap-16 ">
                    <div className=" lg:w-[45%] w-[100%] flex flex-col lg:text-start text-center lg:items-start items-center ">
                        <h1 className='text-[37px] '>Youth Empowerment Summit Y.E.S. Africa</h1>
                        <div className="flex flex-col gap-3 text-muted-foreground lg:w-[60%] py-6 ">
                            <TransText
                                fr="Jadara Foundation et l'Union Panafricaine de la Jeunesse co-organisent en partenariat avec CGLU, LionsGeek et Epic Africa le 1er sommet dédié aux jeunes en situation de NEET en Afrique. Cette première édition se tiendra au Maroc, la prochaine dans un pays de l’Afrique australe."
                                ar='مؤسسة جدارة والاتحاد الإفريقي للشباب ينظمان بالشراكة مع CGLU، LionsGeek و Epic Africa القمة الأولى المخصصة للشباب في وضعية NEET في إفريقيا. ستقام هذه النسخة الأولى في المغرب، والنسخة القادمة في إحدى دول جنوب إفريقيا.'
                                en='Jadara Foundation and the Pan-African Youth Union are co-organizing, in partnership with CGLU, LionsGeek, and Epic Africa, the first summit dedicated to NEET youth in Africa. This first edition will be held in Morocco, with the next in a southern African country.'
                                pr='A Fundação Jadara e a União Pan-Africana da Juventude estão a coorganizar, em parceria com a CGLU, LionsGeek e Epic Africa, a primeira cimeira dedicada aos jovens em situação de NEET em África. Esta primeira edição será realizada em Marrocos, com a próxima num país da África Austral.'
                                sw='Shirika la Jadara na Umoja wa Vijana wa Pan-Afrika wanashirikiana, kwa ushirikiano na CGLU, LionsGeek, na Epic Africa, kuandaa mkutano wa kwanza wa kilele unaowalenga vijana walio katika hali ya NEET barani Afrika. Toleo hili la kwanza litafanyika Morocco, na lile linalofuata katika nchi ya Kusini mwa Afrika.'
                            />
                            <p>
                                <TransText
                                    fr='Veuillez remplir ce formulaire pour soumettre vos informations personnelles, un mail de confirmation vous sera adressé une fois votre demande approuvée.'
                                    ar='يرجى ملء هذا النموذج لتقديم معلوماتك الشخصية،سيتم إرسال بريد إلكتروني لتأكيد طلبك بمجرد الموافقة عليه.'
                                    en='Please fill out this form to submit your personal information, a confirmation email will be sent to you once your request is approved.'
                                    pr='Por favor, preencha este formulário para enviar suas informações pessoais, um e-mail de confirmação será enviado a você assim que seu pedido for aprovado.'
                                    sw='Tafadhali jaza fomu hii ili kuwasilisha taarifa zako binafsi, barua pepe ya uthibitisho itatumwa kwako mara ombi lako litakapokubaliwa.'
                                />

                            </p>
                        </div>
                        <div className="flex flex-col text-[17px] font-bold ">
                            <p>Y.E.S. Africa</p>
                            <p>
                                <TransText
                                    fr='19 & 20 juin 2025 - Marrakech'
                                    ar=' يونيو 2025 - مراكش 19 & 20 '
                                    en='June 19 & 20, 2025 - Marrakech'
                                    pr='19 e 20 de junho de 2025 - Marrakech'
                                    sw='19 na 20 Juni 2025 - Marrakech'
                                />

                            </p>
                        </div>
                    </div>
                    <form
                        className='lg:w-[50%]  p-8 border-gray-300 flex flex-col gap-5 border-[1.4px] rounded-[20px] '
                        onSubmit={HandleSubmit}
                    >
                        <div className="flex flex-col gap-3">
                            <label className='text-[18px] ' htmlFor=""><TransText ar='اللقب' fr='Civilité' en='Civility' pr='Civilidade' sw='Heshima' /><span className='text-red-700 '>*</span></label>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="mr"><TransText ar='السيد' fr='M.' en='Mr.' pr='Sr.' sw='Bw.' /></label>
                                    <input required type="radio" onChange={HandleChange} value="Mr" name="civility" id="mr" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="mme"><TransText ar='السيدة' fr='Mme.' en='Ms.' pr='Sra.' sw='Bi.' /></label>
                                    <input required type="radio" onChange={HandleChange} value="Ms" name="civility" id="mme" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="flname"><TransText ar='الاسم و اللقب' fr='Nom & Prénom' en='Full Name' pr='Sobrenome & Primeiro Nome' sw='Jina la ukoo & Jina la kwanza' /><span className='text-red-700 '>*</span></label>
                            <input required value={data.name} onChange={HandleChange} placeholder={selectedLanguage === "ar" ? "أدخل الاسم الكامل" : selectedLanguage === "fr" ? "Entrez le nom complet" : selectedLanguage === "en" ? "Enter Full Name" : selectedLanguage === "pr" ? "Insira o nome completo" : selectedLanguage === "sw" ? "Ingiza jina kamili" : ""} className='border-[1.4px] px-2 py-1 rounded-[5px] ' type="text" name="name" id="flname" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="organisation"><TransText ar='المنظمة' fr='Organisme' en='Organization' pr='Organização' sw='Shirika' /><span className='text-red-700 '>*</span></label>
                            <input required value={data.organisation} onChange={HandleChange} placeholder={selectedLanguage === "ar" ? "أدخل اسم المنظمة" : selectedLanguage === "fr" ? "Entrez l'organisation" : selectedLanguage === "en" ? "Enter Organization" : selectedLanguage === "pr" ? "Insira a organização" : selectedLanguage === "sw" ? "Ingiza shirika" : ""} className='border-[1.4px] px-2 py-1 rounded-[5px] ' type="text" name="organisation" id="organisation" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <p>Photo: <span className='text-red-700 '>*</span></p>
                                <input
                                    onChange={(e) => { handleFileChange(e, setLogo) }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    type="file"
                                    accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml"
                                    name="logo"
                                    id="logo"
                                    required
                                    capture=""
                                />
                                <label
                                    htmlFor="logo"
                                    className={`flex items-center gap-3 cursor-pointer border border-alpha/20 rounded p-2 ${logo ? 'bg-alpha text-white' : ''}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <TransText ar='شعار' fr='Photo' en='Photo' pr='Logotipo' sw='Nembo' />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category"><TransText ar='الفئة' fr='Catégorie' en='Category' pr='Categoria' sw='Kundi' /><span className='text-red-700 '>*</span></label>
                            <select required onChange={HandleChange} className='border-[1.4px] py-2 rounded-[5px] ' name="category" id="">
                                <option selected disabled>{selectedLanguage === "ar" ? "اختر الفئة" : selectedLanguage === "fr" ? "Choisissez une catégorie" : selectedLanguage === "en" ? "Choose a category" : selectedLanguage === "pr" ? "Escolha uma categoria" : selectedLanguage === "sw" ? "Chagua kundi" : ""}</option>
                                <option value="ngo"><TransText ar='منظمة غير حكومية' fr='ONG' en='NGO' pr='ONG ' sw='NGO ' /></option>
                                <option value="Company"><TransText ar='شركة' fr='Entreprise' en='Company' pr='Empresa' sw='Kampuni' /></option>
                                <option value="Public Organization"><TransText ar='هيئة حكومية' fr='Organisme Public' en='Public Organization' pr='Organização Pública' sw='Shirika la Umma' /></option>
                                <option value="Freelancer"><TransText ar='محترف مستقل' fr='Professionnel Indépendant' en='Freelancer' pr='Profissional Independente' sw='Mtaalamu huru' /></option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="position"><TransText ar='الوظيفة' fr='Fonction' en='Position / Role' pr='Função' sw='Cheo' /><span className='text-red-700 '>*</span></label>
                            <input required value={data.position} onChange={HandleChange}
                                placeholder={selectedLanguage === "ar" ? "أدخل وظيفتك" : selectedLanguage === "fr" ? "Entrez votre fonction" : selectedLanguage === "en" ? "Enter your position/role" : selectedLanguage === "pr" ? "Insira sua função" : selectedLanguage === "sw" ? "Ingiza cheo chako" : ""}
                                className='border-[1.4px] px-2 py-1 rounded-[5px]  ' type="text" name="position" id="position" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="mail"><TransText ar='البريد الإلكتروني' fr='Adresse mail' en='Email address' pr='Endereço de e-mail' sw='Anuani ya barua pepe' /><span className='text-red-700 '>*</span></label>
                            <input required value={data.mail} onChange={HandleChange} placeholder={selectedLanguage === "ar" ? "أدخل بريدك الإلكتروني" : selectedLanguage === "fr" ? "Entrez votre adresse e-mail" : selectedLanguage === "en" ? "Enter your email" : selectedLanguage === "pr" ? "Insira seu e-mail" : selectedLanguage === "sw" ? "Ingiza barua pepe yako" : ""} className='border-[1.4px] px-2 py-1 rounded-[5px]  ' type="email" name="mail" id="mail" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone"><TransText ar='الهاتف' fr='Téléphone' en='Phone' pr='Telefone' sw='Simu' /><span className='text-red-700 '>*</span></label>
                            <input required value={data.phone} onChange={HandleChange} placeholder={selectedLanguage === "ar" ? "أدخل رقم هاتفك" : selectedLanguage === "fr" ? "Entrez votre numéro de téléphone" : selectedLanguage === "en" ? "Enter your phone" : selectedLanguage === "pr" ? "Insira seu telefone" : selectedLanguage === "sw" ? "Ingiza namba yako ya simu" : ""} className='border-[1.4px] px-2 py-1 rounded-[5px]  ' type="number" name="phone" id="phone" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="position"><TransText ar='البلد' fr='Pays' en='Country' pr='País' sw='Nchi' /><span className='text-red-700 '>*</span></label>
                            <select required value={data.country} onChange={HandleChange} className={`  border-[1.4px] py-2 rounded-[5px]`} name="country" id="country">
                                <option selected disabled value="">{selectedLanguage === "ar" ? "أدخل بلدك" : selectedLanguage === "fr" ? "Entrez votre pays" : selectedLanguage === "en" ? "Enter your country" : selectedLanguage === "pr" ? "Insira seu país" : selectedLanguage === "sw" ? "Ingiza nchi yako" : ""}</option>
                                <CountrySelect />
                                <option value="other" >Autre</option>
                            </select>
                            {
                                data.country == "other" &&
                                <>
                                    <input required value={otherCount} onChange={(e) => { setOtherCount(e.target.value) }}
                                        placeholder={selectedLanguage === "ar" ? "أخرى" : selectedLanguage === "fr" ? "Autre" : selectedLanguage === "en" ? "Other" : selectedLanguage === "pr" ? "Outro" : selectedLanguage === "sw" ? "Nyingine" : ""}
                                        className={` ${isOtherChoosed ? "flex" : "hidden"} border-[1.4px] px-2 py-1 rounded-[5px] `}
                                        type="text" name="other" id="otherCount" />
                                </>
                            }
                        </div>
                        <button type='submit' className={` ${isFormFull ? "bg-alpha" : "bg-gray-500 cursor-not-allowed"} py-3 ${isLoading && "bg-gray-300 cursor-progress"} text-white rounded-[5px]`} disabled={isLoading} ><TransText ar={isLoading ? "جارٍ التحميل" : "إرسال"} fr={isLoading ? "Chargement" : "Soumettre"} en={isLoading ? "Loading" : "Submit"} pr={isLoading ? "Carregando" : "Enviar"} sw={isLoading ? "Inapakia" : "Tuma"} /></button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Participants;