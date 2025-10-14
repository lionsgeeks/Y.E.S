import React from "react";
import TransText from "@components/TransText";
import data from "../../../../../json/data.json";

const AcademiqueFormModal = ({ open, formData, setFormData, onSubmit, onClose, loading, indicatif }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <form className="w-[min(95vw,1100px)] bg-white/95 rounded-lg shadow-md max-h-[85vh] overflow-y-auto p-6" onSubmit={onSubmit}>
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-2xl font-bold text-blue-800 mb-6">
                        <TransText en="General Information" ar="المعلومات العامة" fr="Informations Générales" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Institution Name" ar="اسم المؤسسة" fr="Nom de l'institution" /> *</label>
                            <input type="text" name="nom" value={formData.nom} onChange={(e)=>setFormData({...formData, nom:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Logo (PNG/JPG)" ar="الشعار" fr="Logo (PNG/JPG)" /></label>
                            <input type="file" accept=".png,.jpg,.jpeg" onChange={(e)=>setFormData({...formData, logo_path:e.target.files?.[0]||null})} className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Institution Type" ar="نوع المؤسسة" fr="Type d'institution" /> *</label>
                            <select name="type_institution" value={formData.type_institution} onChange={(e)=>setFormData({...formData, type_institution:e.target.value})} className="w-full p-3 border rounded-lg">
                                <option value=""><TransText en="Select..." ar="اختر..." fr="Sélectionner..." /></option>
                                <option>Université</option>
                                <option>Centre de recherche</option>
                                <option>Think tank</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Country" ar="البلد" fr="Pays" /> *</label>
                            <select name="pays" value={formData.pays} onChange={(e)=>setFormData({...formData, pays:e.target.value})} className="w-full p-2 border rounded-md">
                                <option value=""><TransText en="Select a country..." ar="اختر دولة..." fr="Sélectionner un pays..." /></option>
                                {data.map((item) => (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Website" ar="الموقع الإلكتروني" fr="Site web" /></label>
                            <input type="url" name="site_web" value={formData.site_web||''} onChange={(e)=>setFormData({...formData, site_web:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Department" ar="القسم" fr="Département" /></label>
                            <input type="text" name="departement" value={formData.departement||''} onChange={(e)=>setFormData({...formData, departement:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Institutional Email" ar="البريد الإلكتروني المؤسسي" fr="Email institutionnel" /></label>
                            <input type="email" name="email" value={formData.email||''} onChange={(e)=>setFormData({...formData, email:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Phone" ar="الهاتف" fr="Téléphone" /> *</label>
                            <div className="flex">
                                <select name="telephone_code" value={formData.telephone_code||''} onChange={(e)=>setFormData({...formData, telephone_code:e.target.value})} className="w-[5rem] p-2 border rounded-l-md border-gray-300 bg-white">
                                    <option value=""><TransText en="+Code" ar="+الرمز" fr="+Indicatif" /></option>
                                    {indicatif?.sort((a, b)=> a.dial_code.localeCompare(b.dial_code)).map((item)=> (<option key={item.id} value={item.dial_code}>{item.dial_code}</option>))}
                                </select>
                                <input type="tel" name="telephone_number" value={formData.telephone_number||''} onChange={(e)=>setFormData({...formData, telephone_number:e.target.value})} className="w-2/3 p-2 border border-l-0 rounded-r-md border-gray-300" placeholder="Numéro" />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Lead Researcher Contact" ar="جهة اتصال الباحث الرئيسي" fr="Contact chercheur principal" /></label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="text" placeholder="Nom" value={formData.contact_nom||''} onChange={(e)=>setFormData({...formData, contact_nom:e.target.value})} className="p-3 border rounded-lg" />
                                <input type="text" placeholder="Fonction" value={formData.contact_fonction||''} onChange={(e)=>setFormData({...formData, contact_fonction:e.target.value})} className="p-3 border rounded-lg" />
                                <input type="email" placeholder="Email" value={formData.contact_email||''} onChange={(e)=>setFormData({...formData, contact_email:e.target.value})} className="p-3 border rounded-lg" />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-2xl font-bold text-blue-800 mb-6">
                        <TransText en="Research and Programs" ar="البحث والبرامج" fr="Recherche et programmes" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Research Areas" ar="محاور البحث" fr="Axes de recherche" /></label>
                            <textarea rows="3" name="axes_recherche" value={formData.axes_recherche||''} onChange={(e)=>setFormData({...formData, axes_recherche:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Methodologies Used" ar="المنهجيات" fr="Méthodologies" /></label>
                            <textarea rows="3" name="methodologies" value={formData.methodologies||''} onChange={(e)=>setFormData({...formData, methodologies:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Geographic Areas" ar="المناطق الجغرافية" fr="Zones géographiques" /></label>
                            <select multiple name="zones_geographiques" value={formData.zones_geographiques||[]} onChange={(e)=>{
                                const selected = Array.from(e.target.selectedOptions,(o)=>o.value)
                                setFormData({...formData, zones_geographiques:selected})
                            }} className="w-full p-2 border rounded-md h-32">
                                {data.map((item)=> (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Publications" ar="المنشورات" fr="Publications" /></label>
                            <input type="file" multiple onChange={(e)=>setFormData({...formData, publications:Array.from(e.target.files||[])})} className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Training Programs" ar="برامج التدريب" fr="Programmes de formation" /></label>
                            <textarea rows="3" name="programmes_formation" value={formData.programmes_formation||''} onChange={(e)=>setFormData({...formData, programmes_formation:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Target Audience" ar="الجمهور المستهدف" fr="Public cible" /></label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Étudiants','Professionnels','OSC'].map((opt)=> (
                                    <label key={opt} className="flex items-center"><input type="checkbox" checked={(formData.public_cible||[]).includes(opt)} onChange={()=>{
                                        const set=new Set(formData.public_cible||[]); set.has(opt)?set.delete(opt):set.add(opt); setFormData({...formData, public_cible:Array.from(set)})
                                    }} className="mr-2" />{opt}</label>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Modalities" ar="الأنماط" fr="Modalités" /></label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Présentiel','En ligne','Hybride'].map((opt)=> (
                                    <label key={opt} className="flex items-center"><input type="checkbox" checked={(formData.modalites||[]).includes(opt)} onChange={()=>{
                                        const set=new Set(formData.modalites||[]); set.has(opt)?set.delete(opt):set.add(opt); setFormData({...formData, modalites:Array.from(set)})
                                    }} className="mr-2" />{opt}</label>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Certifications" ar="الشهادات" fr="Certifications" /></label>
                            <input type="text" name="certifications" value={formData.certifications||''} onChange={(e)=>setFormData({...formData, certifications:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Research Partners" ar="شركاء البحث" fr="Partenaires de recherche" /></label>
                            <textarea rows="3" name="partenaires_recherche" value={formData.partenaires_recherche||''} onChange={(e)=>setFormData({...formData, partenaires_recherche:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Available Resources" ar="الموارد المتاحة" fr="Ressources disponibles" /></label>
                            <select multiple name="ressources_disponibles" value={formData.ressources_disponibles||[]} onChange={(e)=>{
                                const selected = Array.from(e.target.selectedOptions,(o)=>o.value)
                                setFormData({...formData, ressources_disponibles:selected})
                            }} className="w-full p-3 border rounded-lg h-32">
                                <option value="Bases de données">Bases de données</option>
                                <option value="Outils d'analyse">Outils d'analyse</option>
                                <option value="Méthodologies">Méthodologies</option>
                                <option value="Publications">Publications</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Expertise Offered" ar="الخبرة المقدمة" fr="Expertise proposée" /></label>
                            <textarea rows="3" name="expertise" value={formData.expertise||''} onChange={(e)=>setFormData({...formData, expertise:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Collaboration Opportunities" ar="فرص التعاون" fr="Opportunités de collaboration" /></label>
                            <textarea rows="3" name="opportunites_collaboration" value={formData.opportunites_collaboration||''} onChange={(e)=>setFormData({...formData, opportunites_collaboration:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Organized Conferences" ar="المؤتمرات المنظمة" fr="Conférences organisées" /></label>
                            <textarea rows="3" name="conferences" value={formData.conferences||''} onChange={(e)=>setFormData({...formData, conferences:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Training Workshops" ar="ورش التدريب" fr="Ateliers de formation" /></label>
                            <textarea rows="3" name="ateliers" value={formData.ateliers||''} onChange={(e)=>setFormData({...formData, ateliers:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                    </div>
                </fieldset>
                <div className="text-center p-6">
                    <button type="submit" className="bg-alpha text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center" disabled={loading}>
                        <TransText en="Submit Form" ar="إرسال النموذج" fr="Soumettre le formulaire" />
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 px-4 py-2 border border-beta text-alpha rounded">
                        <TransText en="Cancel" ar="إلغاء" fr="Annuler" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AcademiqueFormModal;


