
import { Language } from '../types';

type Translations = {
  [key: string]: {
    [lang in Language]: string;
  };
};

const translations: Translations = {
  // General UI
  "appTitle": { en: "Strategy Toolkit", zh: "策略分析工具集" },
  "projects": { en: "Projects", zh: "專案" },
  "newProject": { en: "New Project", zh: "新增專案" },
  "createProject": { en: "Create Project", zh: "建立專案" },
  "projectName": { en: "Project Name", zh: "專案名稱" },
  "enterProjectName": { en: "Enter project name...", zh: "請輸入專案名稱..." },
  "cancel": { en: "Cancel", zh: "取消" },
  "create": { en: "Create", zh: "建立" },
  "close": { en: "Close", zh: "關閉" },
  "noProjectSelected": { en: "No Project Selected", zh: "未選擇專案" },
  "selectOrCreateProject": { en: "Select a project from the sidebar or create a new one to begin.", zh: "請從側邊欄選擇一個專案，或建立一個新專案以開始。" },
  "canvases": { en: "Canvases", zh: "分析畫布" },
  "newCanvas": { en: "New Canvas", zh: "新增畫布" },
  "createCanvas": { en: "Create Canvas", zh: "建立畫布" },
  "canvasName": { en: "Canvas Name", zh: "畫布名稱" },
  "enterCanvasName": { en: "Enter canvas name...", zh: "請輸入畫布名稱..." },
  "canvasType": { en: "Canvas Type", zh: "畫布類型" },
  "selectCanvasToView": { en: "Select a canvas to view its content.", zh: "請選擇一個畫布以查看其內容。" },
  "exportToPDF": { en: "Export to PDF", zh: "匯出為 PDF" },
  "language": { en: "Language", zh: "語言" },
  "english": { en: "English", zh: "English" },
  "traditionalChinese": { en: "Traditional Chinese", zh: "繁體中文" },
  "save": { en: "Save", zh: "儲存" },
  "edit": { en: "Edit", zh: "編輯" },
  "guidedQuestions": { en: "Guided Questions", zh: "引導問題" },
  "saveChanges": { en: "Save Changes", zh: "儲存變更" },
  "saved": { en: "Saved!", zh: "已儲存！" },
  "aiAssistant": { en: "AI Assistant", zh: "AI 助理" },
  "askYourQuestion": { en: "Ask your question...", zh: "請輸入您的問題..." },
  "send": { en: "Send", zh: "傳送" },
  "aiThinking": { en: "AI is thinking...", zh: "AI 正在思考..." },
  "welcomeToAI": { en: "Welcome! I'm your AI business assistant. How can I help you analyze your strategy today?", zh: "歡迎！我是您的 AI 商業助理。今天我該如何協助您分析策略？" },
  "aiError": { en: "Sorry, I encountered an error. Please try again.", zh: "抱歉，發生錯誤，請再試一次。" },
  "editItemTitle": { en: "Edit Section", zh: "編輯區塊" },
  "collapseSidebar": { en: "Collapse Sidebar", zh: "收合側邊欄" },
  "expandSidebar": { en: "Expand Sidebar", zh: "展開側邊欄" },
  "editProject": { en: "Edit Project", zh: "編輯專案" },
  "deleteProject": { en: "Delete Project", zh: "刪除專案" },
  "deleteProjectConfirm": { en: "Are you sure you want to delete this project and all its canvases? This action cannot be undone.", zh: "您確定要刪除此專案及其所有畫布嗎？此操作無法復原。" },
  "editCanvas": { en: "Edit Canvas", zh: "編輯畫布" },
  "deleteCanvas": { en: "Delete Canvas", zh: "刪除畫布" },
  "deleteCanvasConfirm": { en: "Are you sure you want to delete this canvas? This action cannot be undone.", zh: "您確定要刪除此畫布嗎？此操作無法復原。" },
  "update": { en: "Update", zh: "更新" },
  "delete": { en: "Delete", zh: "刪除" },


  // BMC Keys
  "bmc_keyPartners": { en: "Key Partners", zh: "關鍵合作夥伴" },
  "bmc_keyActivities": { en: "Key Activities", zh: "關鍵活動" },
  "bmc_valuePropositions": { en: "Value Propositions", zh: "價值主張" },
  "bmc_customerRelationships": { en: "Customer Relationships", zh: "顧客關係" },
  "bmc_customerSegments": { en: "Customer Segments", zh: "目標客群" },
  "bmc_keyResources": { en: "Key Resources", zh: "關鍵資源" },
  "bmc_channels": { en: "Channels", zh: "通路" },
  "bmc_costStructure": { en: "Cost Structure", zh: "成本結構" },
  "bmc_revenueStreams": { en: "Revenue Streams", zh: "收益流" },
  
  "bmc_keyPartners_placeholder": { en: "Who are our key partners/suppliers? Which key resources are we acquiring from them?", zh: "我們的關鍵合作夥伴/供應商是誰？我們從他們那裡獲取哪些關鍵資源？" },
  "bmc_keyActivities_placeholder": { en: "What key activities do our value propositions require? Our distribution channels? Customer relationships?", zh: "我們的價值主張需要哪些關鍵活動？我們的通路、顧客關係需要哪些活動？" },
  "bmc_valuePropositions_placeholder": { en: "What value do we deliver to the customer? Which one of our customer's problems are we helping to solve?", zh: "我們為顧客提供什麼價值？我們正在幫助顧客解決哪個問題？" },
  "bmc_customerRelationships_placeholder": { en: "What type of relationship does each of our customer segments expect us to establish and maintain with them?", zh: "我們的每個目標客群期望我們與他們建立和維持什麼樣的關係？" },
  "bmc_customerSegments_placeholder": { en: "For whom are we creating value? Who are our most important customers?", zh: "我們為誰創造價值？誰是我們最重要的顧客？" },
  "bmc_keyResources_placeholder": { en: "What key resources do our value propositions require? (e.g., physical, intellectual, human, financial)", zh: "我們的價值主張需要哪些關鍵資源？（例如：實體、智慧、人力、財務）" },
  "bmc_channels_placeholder": { en: "Through which channels do our customer segments want to be reached? How are we reaching them now?", zh: "我們的目標客群希望透過哪些通路接觸？我們現在如何接觸他們？" },
  "bmc_costStructure_placeholder": { en: "What are the most important costs inherent in our business model? Which key resources/activities are most expensive?", zh: "我們的商業模式中最重要的成本是什麼？哪些關鍵資源/活動最昂貴？" },
  "bmc_revenueStreams_placeholder": { en: "For what value are our customers really willing to pay? For what do they currently pay?", zh: "我們的顧客真正願意為哪些價值付費？他們目前支付什麼？" },

  "bmc_keyPartners_guide": { en: "• Who are your key partners?\n• Who are your key suppliers?\n• Which key resources are you acquiring from partners?\n• Which key activities do partners perform?", zh: "• 誰是你的關鍵合作夥伴？\n• 誰是你的關鍵供應商？\n• 你從合作夥伴那裡獲取哪些關鍵資源？\n• 合作夥伴執行哪些關鍵活動？" },
  "bmc_keyActivities_guide": { en: "• What key activities do your value propositions require?\n• Your distribution channels?\n• Customer relationships?\n• Revenue streams?", zh: "• 你的價值主張需要哪些關鍵活動？\n• 你的通路？\n• 顧客關係？\n• 收益流？" },
  "bmc_valuePropositions_guide": { en: "• What value do you deliver to the customer?\n• Which one of your customer's problems are you helping to solve?\n• What bundles of products and services are you offering to each customer segment?\n• Which customer needs are you satisfying?", zh: "• 你為顧客提供什麼價值？\n• 你正在幫助顧客解決哪個問題？\n• 你為每個目標客群提供什麼樣的產品和服務組合？\n• 你滿足了哪些顧客需求？" },
  "bmc_customerRelationships_guide": { en: "• What type of relationship does each of your customer segments expect you to establish and maintain?\n• Which ones have you established?\n• How are they integrated with the rest of your business model?\n• How costly are they?", zh: "• 你的每個目標客群期望你建立和維持什麼樣的關係？\n• 你已經建立了哪些？\n• 它們如何與你的商業模式的其他部分整合？\n• 它們的成本有多高？" },
  "bmc_customerSegments_guide": { en: "• For whom are you creating value?\n• Who are your most important customers?\n• Mass Market, Niche Market, Segmented, Diversified, Multi-sided Platform?", zh: "• 你為誰創造價值？\n• 誰是你最重要的顧客？\n• 大眾市場、利基市場、區隔化、多樣化、多邊平台？" },
  "bmc_keyResources_guide": { en: "• What key resources do your value propositions require?\n• Physical, Intellectual (brand patents, copyrights, data), Human, Financial?", zh: "• 你的價值主張需要哪些關鍵資源？\n• 實體、智慧（品牌專利、版權、數據）、人力、財務？" },
  "bmc_channels_guide": { en: "• Through which channels do your customer segments want to be reached?\n• How are you reaching them now?\n• How are your channels integrated?\n• Which ones work best?", zh: "• 你的目標客群希望透過哪些通路接觸？\n• 你現在如何接觸他們？\n• 你的通路如何整合？\n• 哪些通路效果最好？" },
  "bmc_costStructure_guide": { en: "• What are the most important costs inherent in your business model?\n• Which key resources are most expensive?\n• Which key activities are most expensive?", zh: "• 你的商業模式中最重要的成本是什麼？\n• 哪些關鍵資源最昂貴？\n• 哪些關鍵活動最昂貴？" },
  "bmc_revenueStreams_guide": { en: "• For what value are your customers really willing to pay?\n• For what do they currently pay?\n• How are they currently paying?\n• How would they prefer to pay?", zh: "• 你的顧客真正願意為哪些價值付費？\n• 他們目前支付什麼？\n• 他們目前如何支付？\n• 他們偏好如何支付？" },
  
  // PEST Keys
  "pest_political": { en: "Political", zh: "政治 (P)" },
  "pest_economic": { en: "Economic", zh: "經濟 (E)" },
  "pest_social": { en: "Social", zh: "社會 (S)" },
  "pest_technological": { en: "Technological", zh: "科技 (T)" },

  "pest_political_placeholder": { en: "Government policy, political stability, corruption, foreign trade policy, tax policy, labour law, environmental law, trade restrictions...", zh: "政府政策、政治穩定性、貪腐、對外貿易政策、稅收政策、勞動法、環保法規、貿易限制..." },
  "pest_economic_placeholder": { en: "Economic growth, exchange rates, inflation rates, interest rates, disposable income of consumers, unemployment rates...", zh: "經濟成長、匯率、通貨膨脹率、利率、消費者可支配所得、失業率..." },
  "pest_social_placeholder": { en: "Population growth rate, age distribution, career attitudes, safety emphasis, health consciousness, lifestyle attitudes, cultural barriers...", zh: "人口增長率、年齡分佈、職業態度、安全重視、健康意識、生活方式態度、文化障礙..." },
  "pest_technological_placeholder": { en: "Technology incentives, level of innovation, automation, R&D activity, technological change, technological awareness...", zh: "技術誘因、創新水平、自動化、研發活動、技術變革、技術意識..." },

  "pest_political_guide": { en: "• What is the political situation of the country and how can it affect the industry?\n• What are the prevalent tax policies?\n• How will the upcoming elections affect the business environment?", zh: "• 該國的政治局勢如何？它如何影響行業？\n• 現行的稅收政策是什麼？\n• 即將到來的選舉將如何影響商業環境？" },
  "pest_economic_guide": { en: "• What are the current and forecasted economic growth rates?\n• What is the level of disposable income and how is it changing?\n• What is the unemployment rate?", zh: "• 當前和預測的經濟增長率是多少？\n• 可支配所得水平如何？它如何變化？\n• 失業率是多少？" },
  "pest_social_guide": { en: "• What are the dominant cultural norms and values?\n• What are the demographic trends (age, gender, ethnicity)?\n• What are the consumer attitudes towards your product category?", zh: "• 主要的文化規範和價值觀是什麼？\n• 人口趨勢是什麼（年齡、性別、種族）？\n• 消費者對您的產品類別的態度是什麼？" },
  "pest_technological_guide": { en: "• What are the recent technological advancements in your industry?\n• Are there any disruptive technologies on the horizon?\n• What is the level of R&D funding in the sector?", zh: "• 您所在行業最近的技術進步是什麼？\n• 是否有任何顛覆性技術即將出現？\n• 該行業的研發資金水平如何？" },
  
  // SWOT Keys
  "swot_strengths": { en: "Strengths", zh: "優勢 (S)" },
  "swot_weaknesses": { en: "Weaknesses", zh: "劣勢 (W)" },
  "swot_opportunities": { en: "Opportunities", zh: "機會 (O)" },
  "swot_threats": { en: "Threats", zh: "威脅 (T)" },

  "swot_strengths_placeholder": { en: "Internal factors that are favorable compared to competitors. e.g., strong brand, loyal customers, unique technology.", zh: "與競爭對手相比有利的內部因素。例如：強勢品牌、忠實客戶、獨特技術。" },
  "swot_weaknesses_placeholder": { en: "Internal factors that are unfavorable compared to competitors. e.g., high debt, weak brand, outdated technology.", zh: "與競爭對手相比不利的內部因素。例如：高負債、弱勢品牌、過時技術。" },
  "swot_opportunities_placeholder": { en: "External factors that could be exploited to the organization's advantage. e.g., new markets, favorable regulations.", zh: "可被組織利用以獲取優勢的外部因素。例如：新市場、有利的法規。" },
  "swot_threats_placeholder": { en: "External factors that could harm the organization. e.g., new competitors, economic downturn, changing customer preferences.", zh: "可能損害組織的外部因素。例如：新競爭者、經濟衰退、顧客偏好改變。" },

  "swot_strengths_guide": { en: "• What advantages does your organization have?\n• What do you do better than anyone else?\n• What unique or lowest-cost resources can you draw upon that others can't?", zh: "• 您的組織有哪些優勢？\n• 您比其他人做得更好的是什麼？\n• 您可以利用哪些他人無法利用的獨特或最低成本資源？" },
  "swot_weaknesses_guide": { en: "• What could you improve?\n• What should you avoid?\n• What are people in your market likely to see as weaknesses?", zh: "• 您可以改進什麼？\n• 您應該避免什麼？\n• 您市場中的人可能會認為什麼是弱點？" },
  "swot_opportunities_guide": { en: "• What good opportunities can you spot?\n• What interesting trends are you aware of?\n• Can you leverage any PEST factors?", zh: "• 您能發現哪些好機會？\n• 您知道哪些有趣的趨勢？\n• 您可以利用任何 PEST 因素嗎？" },
  "swot_threats_guide": { en: "• What obstacles do you face?\n• What are your competitors doing?\n• Are quality standards or specifications for your job, products or services changing?", zh: "• 您面臨哪些障礙？\n• 您的競爭對手在做什麼？\n• 您的工作、產品或服務的品質標準或規格是否正在改變？" },

  // STP Keys
  "stp_segmentation": { en: "Segmentation", zh: "市場區隔 (S)" },
  "stp_targeting": { en: "Targeting", zh: "目標市場 (T)" },
  "stp_positioning": { en: "Positioning", zh: "市場定位 (P)" },
  
  "stp_segmentation_placeholder": { en: "Divide the broad market into subsets of consumers who have common needs and priorities. (Demographic, Geographic, Psychographic, Behavioral)", zh: "將廣泛市場劃分為具有共同需求和優先順序的消費者子集。（人口統計、地理、心理、行為）" },
  "stp_targeting_placeholder": { en: "Select the most attractive segment(s) to enter. Consider segment size, growth potential, and alignment with your company's objectives.", zh: "選擇最具吸引力的市場區隔進入。考慮區隔規模、增長潛力以及與公司目標的一致性。" },
  "stp_positioning_placeholder": { en: "Define how you want to be perceived by your target customers. Create a clear, unique, and desirable image in their minds relative to competitors.", zh: "定義您希望目標客戶如何看待您。在他們心中創造一個相對於競爭對手清晰、獨特且令人嚮往的形象。" },

  "stp_segmentation_guide": { en: "• How can you group potential customers?\n• What are the key characteristics of each segment (e.g., age, location, lifestyle)?\n• What are the needs and wants of each segment?", zh: "• 您如何對潛在客戶進行分組？\n• 每個區隔的主要特徵是什麼（例如，年齡、地點、生活方式）？\n• 每個區隔的需求和慾望是什麼？" },
  "stp_targeting_guide": { en: "• Which segments are most profitable?\n• Which segments can you serve best?\n• Do you have the resources to target these segments effectively?", zh: "• 哪些區隔最有利可圖？\n• 您能最好地服務哪些區隔？\n• 您有足夠的資源來有效地鎖定這些區隔嗎？" },
  "stp_positioning_guide": { en: "• What is your unique selling proposition (USP)?\n• How do you differ from your competitors?\n• What is the key message you want to communicate to your target audience?", zh: "• 您獨特的銷售主張（USP）是什麼？\n• 您與競爭對手有何不同？\n• 您想向目標受眾傳達的關鍵信息是什麼？" },
};

export const getTranslator = (lang: Language) => (key: string): string => {
  return translations[key]?.[lang] || key;
};