import { Link, usePage } from "@inertiajs/react";

const DetailsPage = () => {
    const { props } = usePage();
    const details = props.item;
    const type = props.type;

    // Helper function to check if a value should be displayed
    const shouldShow = (value) => {
        if (value === null || value === undefined || value === '') return false;
        if (Array.isArray(value) && value.length === 0) return false;
        if (typeof value === 'string' && value.trim() === '') return false;
        return true;
    };

    // Helper function to check if value is an array (or JSON array string)
    const isArrayValue = (value) => {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
            try {
                const parsed = JSON.parse(value);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch (e) {
                // If parsing fails, return false
            }
        }
        return false;
    };

    // Helper function to render array as scrollable list
    const renderArrayAsList = (array) => {
        return (
            <div className="max-h-32 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                {array.map((item, index) => (
                    <div key={index} className="py-1 px-2 text-sm border-b border-gray-100 last:border-b-0">
                        {item}
                    </div>
                ))}
            </div>
        );
    };

    // Helper function to render a table row only if value exists
    const renderRow = (label, value, isLink = false, linkProps = {}) => {
        if (!shouldShow(value)) return null;
        
        const arrayValue = isArrayValue(value);
        
        return (
            <tr className="border-b border-gray-300">
                <th className="text-left p-4 bg-[#e0ecff9d] text-black align-top w-1/3">{label}</th>
                <td className="p-4">
                    {arrayValue ? (
                        renderArrayAsList(arrayValue)
                    ) : isLink ? (
                        <a href={value} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer" {...linkProps}>
                            {value}
                        </a>
                    ) : (
                        <span className="whitespace-pre-wrap break-words">{value}</span>
                    )}
                </td>
            </tr>
        );
    };

    const renderOrganizationDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 table-auto text-sm">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Questions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Réponse</th>
                    </tr>
                    {renderRow("Nom de l'organisation", details.name)}
                    {renderRow("Année de création", details.creation_year)}
                    {renderRow("Statut légal", details.legal_status)}
                    {details.legal_status === 'Autre' && renderRow("Autre statut légal", details.other_legal_status)}
                    {renderRow("Email principal", details.main_email)}
                    {renderRow("Téléphone", details.phone)}
                    {renderRow("Adresse postale", details.postal_address)}
                    {renderRow("Site web", details.website, true)}
                    {renderRow("Pays d'implantations", details.country)}
                    {renderRow("Pays d'interventions", details.regions)}
                    {shouldShow(details.facebook_url) || shouldShow(details.twitter_url) || shouldShow(details.linkedin_url) || shouldShow(details.instagram_url) ? (
                        <tr className="border-b border-gray-300 align-top">
                            <th className="text-left p-4 bg-[#e0ecff9d] text-black">Réseaux sociaux</th>
                            <td className="p-4">
                                <ul className="list-disc list-inside space-y-1">
                                    {shouldShow(details.facebook_url) && (
                                        <li>Facebook: <a href={details.facebook_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.facebook_url}</a></li>
                                    )}
                                    {shouldShow(details.twitter_url) && (
                                        <li>Twitter: <a href={details.twitter_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.twitter_url}</a></li>
                                    )}
                                    {shouldShow(details.linkedin_url) && (
                                        <li>LinkedIn: <a href={details.linkedin_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.linkedin_url}</a></li>
                                    )}
                                    {shouldShow(details.instagram_url) && (
                                        <li>Instagram: <a href={details.instagram_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.instagram_url}</a></li>
                                    )}
                                </ul>
                            </td>
                        </tr>
                    ) : null}
                    {renderRow("Nom du contact", details.contact_name)}
                    {renderRow("Fonction du contact", details.contact_function)}
                    {renderRow("Email du contact", details.contact_email)}
                    {renderRow("Zones d'intervention", details.intervention_areas)}
                    {renderRow("Groupes cibles", details.target_groups)}
                    {renderRow("Bénéficiaires annuels", details.annual_beneficiaries)}
                    {renderRow("Bonnes Pratiques", details.program_title)}
                    {/* <tr className="border-b border-gray-300 align-top">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Description du programme</th>
                        <td className="p-4">{details.program_description}</td>
                    </tr>
                    <tr className="border-b border-gray-300 align-top">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Approche méthodologique</th>
                        <td className="p-4">{details.methodological_approach}</td>
                    </tr>
                    <tr className="border-b border-gray-300 align-top">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Résultats attendus</th>
                        <td className="p-4">
                            <ul className="list-disc list-inside space-y-1">
                                <li>{details.result1}</li>
                                <li>{details.result2}</li>
                                <li>{details.result3}</li>
                            </ul>
                        </td>
                    </tr> */}
                    {/* <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Partenaires techniques</th>
                        <td className="p-4">{details.technical_partners}</td>
                    </tr>
                    <tr className='border-b
     border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Partenaires financiers</th>
                        <td className="p-4">{details.financial_partners}</td>
                    </tr> */}
                </tbody>
                </table>
            </div>
        </div>
    );

    const renderBailleurDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 table-auto bg-white text-sm rounded-md">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Questions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Réponse</th>
                    </tr>
                    {renderRow("Nom d'institution", details.nom)}
                    {renderRow("Type d'institution", details.type_institution)}
                    {details.type_institution === 'Autre' && renderRow("Autre", details.type_institution_autre)}
                    {renderRow("Pays d'origine", details.pays_origine)}
                    {renderRow("Couverture géographique", details.couverture_geographique)}
                    {renderRow("Site web", details.site_web, true)}
                    {renderRow("Email", details.email_contact)}
                    {renderRow("Téléphone", details.telephone)}
                    
                    {(shouldShow(details.contact_responsable?.nom) || shouldShow(details.contact_responsable?.fonction) || shouldShow(details.contact_responsable?.email)) && (
                        <tr className="border-b border-gray-300">
                            <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3 align-top">Contact responsable</th>
                            <td className="p-4">
                                {shouldShow(details.contact_responsable?.nom) && <p><strong>Nom:</strong> {details.contact_responsable.nom}</p>}
                                {shouldShow(details.contact_responsable?.fonction) && <p><strong>Fonction:</strong> {details.contact_responsable.fonction}</p>}
                                {shouldShow(details.contact_responsable?.email) && <p><strong>Email:</strong> {details.contact_responsable.email}</p>}
                            </td>
                        </tr>
                    )}

                    {(shouldShow(details.twitter_url2) || shouldShow(details.linkedin_url2)) && (
                        <tr className="border-b border-gray-300">
                            <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3 align-top">Réseaux sociaux</th>
                            <td className="p-4">
                                <ul className="list-disc list-inside space-y-1">
                                    {shouldShow(details.twitter_url2) && (
                                        <li>Twitter: <a href={details.twitter_url2} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.twitter_url2}</a></li>
                                    )}
                                    {shouldShow(details.linkedin_url2) && (
                                        <li>LinkedIn: <a href={details.linkedin_url2} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.linkedin_url2}</a></li>
                                    )}
                                </ul>
                            </td>
                        </tr>
                    )}

                    {renderRow("Bonnes Pratiques", details.priorites_thematiques)}
                    {/* <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Modalités de soutien</th>
                        <td className="p-4">{details.modalites_soutien}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Financement minimum</th>
                        <td className="p-4">{details.financement_min}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Financement maximum</th>
                        <td className="p-4">{details.financement_max}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Budget annuel</th>
                        <td className="p-4">{details.budget_annuel}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Critères d'éligibilité</th>
                        <td className="p-4">{details.criteres_eligibilite}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Projets phares</th>
                        <td className="p-4">{details.projets_phares}</td>
                    </tr>
                    <tr className='border-b
     border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Approche d'impact</th>
                        <td className="p-4">{details.approche_impact}</td>
                    </tr>
                    <tr className='border-b
     border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Partenaires actuels</th>
                        <td className="p-4">{details.partenaires_actuels}</td>
                    </tr>
                    <tr className='border-b
     border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Procédure de soumission</th>
                        <td className="p-4">{details.procedure_soumission}</td>
                    </tr> */}
                </tbody>
                </table>
            </div>
        </div>
    );

    const renderEntrepriseDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-md text-sm">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Questions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Réponse</th>
                    </tr>
                    {renderRow("Nom de l'entreprise", details.nom)}
                    {renderRow("Secteur", details.secteur)}
                    {renderRow("Taille", details.taille)}
                    {renderRow("Pays du siège", details.pays_siege)}
                    {renderRow("Pays d'interventions", details.regions_afrique)}
                    {renderRow("Site web", details.site_web, true)}
                    {renderRow("Email de contact", details.email_contact)}
                    {renderRow("Téléphone", details.telephone_code && details.telephone_number ? `${details.telephone_code} ${details.telephone_number}` : details.telephone)}
                    
                    {(shouldShow(details.contact_rse?.nom) || shouldShow(details.contact_rse?.fonction) || shouldShow(details.contact_rse?.email)) && (
                        <tr className="border-b border-gray-300">
                            <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3 align-top">Contact RSE</th>
                            <td className="p-4">
                                {shouldShow(details.contact_rse?.nom) && <p><strong>Nom:</strong> {details.contact_rse.nom}</p>}
                                {shouldShow(details.contact_rse?.fonction) && <p><strong>Fonction:</strong> {details.contact_rse.fonction}</p>}
                                {shouldShow(details.contact_rse?.email) && <p><strong>Email:</strong> {details.contact_rse.email}</p>}
                            </td>
                        </tr>
                    )}

                    {renderRow("Politique d'inclusion", details.politique_inclusion)}
                    {renderRow("Programmes d'intégration", details.programmes_integration)}
                    {renderRow("Postes/stages annuels", details.postes_stages_annuels)}
                    {renderRow("Dispositifs de formation", details.dispositifs_formation)}
                    {renderRow("Partenariats avec OSC", details.partenariats_osc)}
                    {renderRow("Initiatives de mécénat", details.initiatives_mecenat)}
                    {renderRow("Compétences pro bono", details.competences_pro_bono)}
                    {renderRow("Profils recherchés", details.profils_recherches)}
                    {renderRow("Régions de recrutement", details.regions_recrutement)}
                    {renderRow("Processus d'intégration", details.processus_integration)}
                </tbody>
                </table>
            </div>
        </div>
    );


    const renderAgenceDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 table-auto text-left text-sm">
                <tbody>
                    <tr className="border-b text-center border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Qestions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Reponse Type</th>
                    </tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Name</th>
                        <th className='p-4'> {details.nom}</th>
                    </tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Type d'organisation</th>
                        <td className="p-4">{details.type_organisation}</td>
                    </tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Pays représentés</th><td className="p-4">{details.pays_representes}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Couverture en Afrique</th><td className="p-4">{details.couverture_afrique}</td></tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Site web</th>
                        <td className="p-4">
                            <a href={details.site_web} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                                {details.site_web}
                            </a>
                        </td>
                    </tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Email institutionnel</th><td className="p-4">{details.email_institutionnel}</td></tr>
                    <tr className='border-b border-alpha'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Bureaux en Afrique</th><td className="p-4">{details.bureaux_afrique}</td></tr>

                    <tr className='border-b border-gray-300'><th colSpan="2" className="p-4 bg-[#e0ecff9d] text-alpha font-semibold">Contact Jeunesse</th></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Nom</th><td className="p-4">{details.contact_jeunesse?.nom}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Fonction</th><td className="p-4">{details.contact_jeunesse?.fonction}</td></tr>
                    <tr className='border-b border-alpha'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Email</th><td className="p-4">{details.contact_jeunesse?.email}</td></tr>

                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Priorités thématiques</th><td className="p-4">{details.priorites_thematiques}</td></tr>
                    {shouldShow(details.cadre_strategique) && (
                        <tr className='border-b border-gray-300'>
                            <th className="text-left p-4 bg-[#e0ecff9d] text-black">Cadre stratégique</th>
                            <td className="p-4">
                                <a href={`/storage/${details.cadre_strategique}`} className="text-blue-600">Télécharger</a>
                            </td>
                        </tr>
                    )}
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Budget</th><td className="p-4">{details.budget}</td></tr>
                    <tr className='border-b border-alpha'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Période</th><td className="p-4">{details.annee_debut} - {details.annee_fin}</td></tr>

                    <tr className='border-b border-gray-300'><th colSpan="2" className="p-2 bg-[#e0ecff9d] text-alpha font-semibold">Programmes Phares</th></tr>
                    {details.programmes_phares?.map((programme, index) => (
                        <>
                            <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Titre</th><td className="p-4">{programme.titre}</td></tr>
                            <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Objectifs</th><td className="p-4">{programme.objectifs}</td></tr>
                            <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Pays d'intervention</th><td className="p-4">{programme.pays_intervention}</td></tr>
                            <tr className='border-b border-alpha'>
                                <th className="text-left p-4 bg-[#e0ecff9d] text-black">Résultats</th>
                                <td className="p-4">
                                    <ul className="list-disc ml-4">
                                        {programme.resultats
                                            .split('.')
                                            .filter(r => r.trim() !== '')
                                            .map((res, i) => <li key={i}>{res.trim()}.</li>)
                                        }
                                    </ul>
                                </td>
                            </tr>
                        </>
                    ))}

                    {shouldShow(details.outils_methodologiques) && (
                        <tr className='border-b border-gray-300'>
                            <th className="text-left p-4 bg-[#e0ecff9d] text-black">Outils méthodologiques</th>
                            <td className="p-4">
                                <a href={`/storage/${details.outils_methodologiques}`} className="text-blue-600">Télécharger</a>
                            </td>
                        </tr>
                    )}
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Opportunités de financement</th><td className="p-4">{details.opportunites_financement}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Type de partenaires recherchés</th><td className="p-4">{details.type_partenaires}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Domaines d'expertise</th><td className="p-4">{details.domaines_expertise}</td></tr>
                </tbody>
                </table>
            </div>
        </div>
    );

    const renderPubliqueDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm table-auto text-left">
                <tbody>
                    <tr className="border-b text-center border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Questions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Réponse</th>
                    </tr>
                    {renderRow("Nom", details.institution_name)}
                    {renderRow("Type d'institution", details.institution_type)}
                    {renderRow("Pays", details.country)}
                    {renderRow("Site web", details.website, true)}
                    {renderRow("Email", details.email)}
                    {renderRow("Téléphone", details.phone_code && details.phone_number ? `${details.phone_code} ${details.phone_number}` : details.phone)}
                    {renderRow("Adresse", details.address)}

                    {(shouldShow(details.youth_contact_name) || shouldShow(details.youth_contact_position) || shouldShow(details.youth_contact_email)) && (
                        <>
                            <tr className='border-b border-gray-300'><th colSpan="2" className="border-t border-b border-alpha p-2 bg-[#e0ecff9d] text-alpha font-semibold">Contact Jeunesse</th></tr>
                            {renderRow("Nom", details.youth_contact_name)}
                            {renderRow("Poste", details.youth_contact_position)}
                            {renderRow("Email", details.youth_contact_email)}
                        </>
                    )}

                    {renderRow("Cadre politique", details.policy_framework)}
                    {renderRow("Priorités stratégiques", details.strategic_priorities)}
                    {renderRow("Budget annuel", details.annual_budget)}
                    {renderRow("Public cible", details.execution_partners)}
                    {renderRow("Mécanismes de soutien", details.support_mechanisms)}
                    {renderRow("Nom du Programme phare", details.flagship_program)}

                    {(shouldShow(details.expected_result_1) || shouldShow(details.expected_result_2) || shouldShow(details.expected_result_3)) && (
                        <>
                            <tr className='border-b border-gray-300'><th colSpan="2" className="border-t border-b border-alpha p-2 bg-[#e0ecff9d] text-alpha font-semibold">Résultats attendus</th></tr>
                            {renderRow("Résultats 1", details.expected_result_1)}
                            {renderRow("Résultats 2", details.expected_result_2)}
                            {renderRow("Résultats 3", details.expected_result_3)}
                        </>
                    )}

                    {renderRow("Assistance Technique", details.technical_assistance)}
                    {renderRow("Bonnes pratiques Recherchées", details.best_practices)}
                    {renderRow("Opportunites de cooperation", details.cooperation_opportunities)}

                </tbody>
                </table>
            </div>
        </div>
    );


    const renderAcademiqueDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-300 text-sm">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Questions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Réponse</th>
                    </tr>
                    {renderRow("Nom d'institution", details.nom)}
                    {renderRow("Type d'institution", details.type_institution)}
                    {renderRow("Pays", details.pays)}
                    {renderRow("Département", details.departement)}
                    {renderRow("Site web", details.site_web, true)}
                    {renderRow("Email", details.email)}
                    {renderRow("Téléphone", details.telephone)}

                    {(shouldShow(details.contact_nom) || shouldShow(details.contact_fonction) || shouldShow(details.contact_email)) && (
                        <>
                            <tr className="border-b border-alpha">
                                <th colSpan="2" className="text-left p-4 bg-[#e0ecff9d] text-black">Contact Chercheur</th>
                            </tr>
                            {renderRow("Nom", details.contact_nom)}
                            {renderRow("Fonction", details.contact_fonction)}
                            {renderRow("Email", details.contact_email)}
                        </>
                    )}

                    {renderRow("Axes de recherche", details.axes_recherche)}
                    {renderRow("Méthodologies", details.methodologies)}
                    {renderRow("Zones géographiques", details.zones_geographiques)}
                    {renderRow("Programmes de formation", details.programmes_formation)}
                    {renderRow("Public cible", details.public_cible)}
                    {renderRow("Modalités", details.modalites)}
                    {renderRow("Certifications", details.certifications)}
                    {renderRow("Partenaires de recherche", details.partenaires_recherche)}
                    {renderRow("Expertise", details.expertise)}
                    {renderRow("Conférences", details.conferences)}
                    {renderRow("Ateliers", details.ateliers)}
                    {renderRow("Ressources disponibles", details.ressources_disponibles)}
                </tbody>
                </table>
            </div>
        </div>
    );


    const renderContent = () => {
        if (!details) return <div className="text-center py-8">Aucune donnée disponible</div>;

        switch (type) {
            case 'App\\Models\\Organization':
                return renderOrganizationDetails();
            case 'App\\Models\\Bailleur':
                return renderBailleurDetails();
            case 'App\\Models\\Entreprise':
                return renderEntrepriseDetails();
            case 'App\\Models\\Agence':
                return renderAgenceDetails();
            case 'App\\Models\\Publique':
                return renderPubliqueDetails();
            case 'App\\Models\\Academique':
                return renderAcademiqueDetails();
            default:
                return <div className="text-red-500">Type non reconnu: {type}</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Link
                href={"/maps"}
                className="mb-8 p-2  text-beta border border-beta rounded "
            >
                ← Retour à la carte
            </Link>
            {renderContent()}
        </div>
    );
};

export default DetailsPage;
