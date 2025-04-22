
import axios from 'axios';

// API base URL - in a real application, this would be an environment variable
const API_BASE_URL = 'http://localhost:3001';

// Tool types
export type Tool = 'standardBook' | 'restrictedSection' | 'cursedScroll';
export type Role = 'student' | 'prefect' | 'teacher';

// Request and response interfaces
export interface BorrowRequest {
  role: Role;
  context?: string;
  tool: Tool;
}

export interface BorrowResponse {
  success: boolean;
  message: string;
  result?: string;
  error?: string;
}

// API service functions
export const cerberusApi = {
  // Function to simulate sending a request to our "server"
  borrowTool: async (request: BorrowRequest): Promise<BorrowResponse> => {
    try {
      // In a real app, this would go to a real server
      // For this demo, we'll implement it client-side to simulate the server behavior
      return simulateServerResponse(request);
    } catch (error) {
      console.error('Error accessing tool:', error);
      return {
        success: false,
        message: 'An error occurred while trying to access the tool',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
};

// Simulated server-side function
// This mimics what would happen on a real server with policy enforcement
async function simulateServerResponse(request: BorrowRequest): Promise<BorrowResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Policy definitions - in a real system this would be stored in a database or config
  const policyRules = {
    student: ['standardBook'],
    prefect: ['standardBook', 'restrictedSection'],
    teacher: ['standardBook', 'restrictedSection', 'cursedScroll']
  };
  
  // Check if the role has access to the requested tool
  const allowedTools = policyRules[request.role] || [];
  const hasAccess = allowedTools.includes(request.tool);
  
  if (!hasAccess) {
    return {
      success: false,
      message: `Access denied: ${request.role}s are not allowed to access the ${formatToolName(request.tool)}.`,
      error: 'PERMISSION_DENIED'
    };
  }
  
  // If access is allowed, execute the tool function
  return executeToolFunction(request.tool, request.context || '');
}

// Tool execution functions
function executeToolFunction(tool: Tool, context: string): BorrowResponse {
  // These would be registered functions in a real system
  const toolFunctions = {
    standardBook: () => ({
      success: true,
      message: 'Standard book access granted.',
      result: `You have successfully borrowed "${context || 'A Standard Magical Text'}". The book opens to reveal basic magical knowledge.`
    }),
    
    restrictedSection: () => ({
      success: true,
      message: 'Restricted section access granted.',
      result: `You have accessed the restricted section and found "${context || 'Advanced Magical Knowledge'}". The pages shimmer with powerful enchantments.`
    }),
    
    cursedScroll: () => ({
      success: true,
      message: 'Cursed scroll access granted.',
      result: `You have unlocked the cursed scroll containing "${context || 'Forbidden Knowledge'}". Dark energy emanates from the ancient parchment.`
    })
  };
  
  // Execute the corresponding function
  return toolFunctions[tool]();
}

// Helper to format tool names for display
function formatToolName(tool: Tool): string {
  switch(tool) {
    case 'standardBook': return 'Standard Book';
    case 'restrictedSection': return 'Restricted Section';
    case 'cursedScroll': return 'Cursed Scroll';
    default: return tool;
  }
}
