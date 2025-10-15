import React from "react";
import DynamicFields from './shared/DynamicFields'
import TransText from "@components/TransText";
import data from "../../../../../json/data.json";

const OscFormModal = ({ open, formData, setFormData, onSubmit, onClose, loading, indicatif, extraColumns = [] }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <form className="w-[min(95vw,1100px)] bg-white/95 rounded-lg shadow-md max-h-[85vh] overflow-y-auto p-6" onSubmit={onSubmit}>
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-xl font-bold text-alpha mb-4">
                        <TransText en="General Information" ar="المعلومات العامة" fr="Informations Générales" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                <TransText en="Organization Name" ar="اسم المنظمة" fr="Nom de l'organisation" />
                            </label>
                            <input type="text" name="name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Logo (PNG/JPG - max 5MB)</label>
                            <input name="logo" type="file" accept="image/png, image/jpeg" onChange={(e)=>setFormData({...formData, logo:e.target.files?.[0]||null})} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                <TransText en="Year of Creation" ar="سنة التأسيس" fr="Année de création" />
                            </label>
                            <input type="number" value={formData.creation_year} onChange={(e)=>setFormData({...formData, creation_year:e.target.value})} min="1900" max="2025" name="creation_year" className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                <TransText en="Legal Status" ar="الحالة القانونية" fr="Statut juridique" />
                            </label>
                            <select className="w-full p-2 border rounded-md" id="legal-status" name="legal_status" value={formData.legal_status} onChange={(e)=>setFormData({...formData, legal_status:e.target.value})}>
                                <option value=""><TransText en="Select..." ar="اختر..." fr="Sélectionner..." /></option>
                                <option>Association</option>
                                <option>Foundation</option>
                                <option>Cooperative</option>
                                <option>Autre</option>
                            </select>
                            {formData.legal_status === "Autre" && (
                                <input type="text" placeholder="Précisez" className="w-full p-2 border rounded-md mt-2" name="other_legal_status" value={formData.other_legal_status} onChange={(e)=>setFormData({...formData, other_legal_status:e.target.value})} />
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Implementation Countries" ar="دول التنفيذ" fr="Pays d'implantations" /></label>
                            <select onChange={(e)=>setFormData({...formData, country:Array.from(e.target.selectedOptions,(o)=>o.value)})} className="w-full  p-2 border rounded-md" name="country" multiple>
                                {data.map((item) => (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Website" ar="الموقع الإلكتروني" fr="Site web" /></label>
                            <input type="url" className="w-full p-2 border rounded-md" name="website" value={formData.website} onChange={(e)=>setFormData({...formData, website:e.target.value})} />
                        </div>
                    </div>
                </fieldset>
                {/* Regions checkboxes */}
                <div className="space-y-2 md:col-span-2 p-6">
                    <label className="block text-sm font-medium text-gray-700"><TransText en="Intervention Countries (Regions)" ar="دول التدخل" fr="Pays d'interventions" /></label>
                    <div className="h-52 overflow-y-scroll border border-gray-300 rounded-md p-2 space-y-1">
                        {data.map((item) => (
                            <label key={item.name} className="flex items-center ml-2">
                                <input type="checkbox" checked={(formData.regions||[]).includes(item.name)} onChange={(e)=>{
                                    const set = new Set(formData.regions||[]); e.target.checked ? set.add(item.name) : set.delete(item.name); setFormData({...formData, regions:Array.from(set)})
                                }} className="mr-2" />
                                {item.name}
                            </label>
                        ))}
                    </div>
                </div>
                {/* Contacts */}
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-xl font-bold text-alpha mb-4"><TransText en="Contact Information" ar="معلومات الاتصال" fr="Coordonnées" /></legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Primary Email" ar="البريد الإلكتروني الرئيسي" fr="Email principal" /></label>
                            <input type="email" className="w-full p-2 border rounded-md" value={formData.main_email||''} onChange={(e)=>setFormData({...formData, main_email:e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Phone" ar="الهاتف" fr="Téléphone" /></label>
                            <input type="tel" placeholder="+CodeNumber" className="w-full p-2 border rounded-md" value={formData.phone||''} onChange={(e)=>setFormData({...formData, phone:e.target.value})} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Postal Address" ar="العنوان البريدي" fr="Adresse postale" /></label>
                            <textarea className="w-full p-2 border rounded-md" rows="3" value={formData.postal_address||''} onChange={(e)=>setFormData({...formData, postal_address:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Main Contact" ar="جهة الاتصال الرئيسية" fr="Contact principal" /></label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input type="text" placeholder="Nom" className="p-2 border rounded-md" value={formData.contact_name||''} onChange={(e)=>setFormData({...formData, contact_name:e.target.value})} />
                                <input type="text" placeholder="Fonction" className="p-2 border rounded-md" value={formData.contact_function||''} onChange={(e)=>setFormData({...formData, contact_function:e.target.value})} />
                                <input type="email" placeholder="Email" className="p-2 border rounded-md" value={formData.contact_email||''} onChange={(e)=>setFormData({...formData, contact_email:e.target.value})} />
                            </div>
                        </div>
                    </div>
                </fieldset>
                {/* Socials */}
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-xl font-bold text-alpha mb-4"><TransText en="Social Media" ar="وسائل التواصل" fr="Réseaux sociaux" /></legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={!!formData.social_facebook} onChange={()=>setFormData({...formData, social_facebook:!formData.social_facebook})} className="h-4 w-4" />
                                <span>Facebook</span>
                            </div>
                            {formData.social_facebook && (
                                <input type="url" placeholder="https://facebook.com/..." value={formData.facebook_url||''} onChange={(e)=>setFormData({...formData, facebook_url:e.target.value})} className="w-full p-2 border rounded mt-1" />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={!!formData.social_twitter} onChange={()=>setFormData({...formData, social_twitter:!formData.social_twitter})} className="h-4 w-4" />
                                <span>Twitter</span>
                            </div>
                            {formData.social_twitter && (
                                <input type="url" placeholder="https://twitter.com/..." value={formData.twitter_url||''} onChange={(e)=>setFormData({...formData, twitter_url:e.target.value})} className="w-full p-2 border rounded mt-1" />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={!!formData.social_linkedin} onChange={()=>setFormData({...formData, social_linkedin:!formData.social_linkedin})} className="h-4 w-4" />
                                <span>LinkedIn</span>
                            </div>
                            {formData.social_linkedin && (
                                <input type="url" placeholder="https://linkedin.com/..." value={formData.linkedin_url||''} onChange={(e)=>setFormData({...formData, linkedin_url:e.target.value})} className="w-full p-2 border rounded mt-1" />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={!!formData.social_instagram} onChange={()=>setFormData({...formData, social_instagram:!formData.social_instagram})} className="h-4 w-4" />
                                <span>Instagram</span>
                            </div>
                            {formData.social_instagram && (
                                <input type="url" placeholder="https://instagram.com/..." value={formData.instagram_url||''} onChange={(e)=>setFormData({...formData, instagram_url:e.target.value})} className="w-full p-2 border rounded mt-1" />
                            )}
                        </div>
                    </div>
                </fieldset>
                {/* Activity Details */}
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-xl font-bold text-alpha mb-4"><TransText en="Partners" ar="الشركاء" fr="Partenaires" /></legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Technical partners</label>
                            <textarea className="w-full p-2 border rounded-md" rows="3" value={formData.technical_partners||''} onChange={(e)=>setFormData({...formData, technical_partners:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Financial partners</label>
                            <textarea className="w-full p-2 border rounded-md" rows="3" value={formData.financial_partners||''} onChange={(e)=>setFormData({...formData, financial_partners:e.target.value})}></textarea>
                        </div>
                    </div>
                </fieldset>
                {/* Program core fields */}
                <fieldset className="bg-gray-100 p-6 rounded-lg mt-4">
                    <legend className="text-xl font-bold text-alpha mb-4"><TransText en="Program Details" ar="تفاصيل البرنامج" fr="Détails du programme" /></legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Program Title" ar="عنوان البرنامج" fr="Titre du programme" /></label>
                            <input type="text" className="w-full p-2 border rounded-md" name="program_title" value={formData.program_title||''} onChange={(e)=>setFormData({...formData, program_title:e.target.value})} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Program Description" ar="وصف البرنامج" fr="Description du programme" /></label>
                            <textarea className="w-full p-2 border rounded-md" rows="4" name="program_description" value={formData.program_description||''} onChange={(e)=>setFormData({...formData, program_description:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Methodological Approach" ar="المنهجية" fr="Approche méthodologique" /></label>
                            <textarea className="w-full p-2 border rounded-md" rows="3" name="methodological_approach" value={formData.methodological_approach||''} onChange={(e)=>setFormData({...formData, methodological_approach:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Target Groups" ar="الفئات المستهدفة" fr="Groupes cibles" /></label>
                            <input type="text" className="w-full p-2 border rounded-md" name="target_groups" placeholder="e.g. Youth, Women" value={formData.target_groups||''} onChange={(e)=>setFormData({...formData, target_groups:e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Annual Beneficiaries" ar="المستفيدون سنويًا" fr="Bénéficiaires annuels" /></label>
                            <input type="number" min="0" className="w-full p-2 border rounded-md" name="annual_beneficiaries" value={formData.annual_beneficiaries||''} onChange={(e)=>setFormData({...formData, annual_beneficiaries:e.target.value})} />
                        </div>
                    </div>
                </fieldset>
                {/* Only show extra fields we actually need: exclude duplicates and system/boolean toggles */}
                <DynamicFields
                    columns={extraColumns}
                    values={formData}
                    setValues={setFormData}
                    exclude={[
                        'name','logo','creation_year','legal_status','other_legal_status','country','regions','website',
                        'facebook_url','twitter_url','linkedin_url','instagram_url','main_email','phone','postal_address',
                        'contact_name','contact_function','contact_email','intervention_areas','target_groups','annual_beneficiaries',
                        'program_title','program_description','methodological_approach','technical_partners','financial_partners','lat','lng','is_approved','social_facebook','social_twitter','social_linkedin','social_instagram','result1','result2','result3'
                    ]}
                />
                <div className="text-center">
                    <button type="submit" className="bg-alpha text-white px-8 py-3 my-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center" disabled={loading}>
                        {loading ? (<TransText en="Submitting..." ar="جاري الإرسال..." fr="Envoi..." />) : (<TransText en="Submit Form" ar="إرسال النموذج" fr="Soumettre le formulaire" />)}
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 px-4 py-2 border border-beta text-alpha rounded">
                        <TransText en="Cancel" ar="إلغاء" fr="Annuler" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OscFormModal;


