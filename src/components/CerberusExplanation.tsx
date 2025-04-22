
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CerberusExplanation = () => {
  return (
    <Card className="mt-12 p-4">
      <CardHeader>
        <CardTitle className="text-xl">How Cerberus Access Control Works</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p>
          The Cerberus Access Control System demonstrates a metadata-driven approach to agent tools access management:
        </p>
        
        <div className="pl-4 border-l-2 border-primary">
          <h3 className="font-bold">Core Components:</h3>
          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>
              <span className="font-semibold">Client (You)</span>: Selects a role and attempts to access tools
            </li>
            <li>
              <span className="font-semibold">Server (MCP)</span>: Evaluates access requests and applies policy rules
            </li>
            <li>
              <span className="font-semibold">Policy Discriminator</span>: Determines which tools each role may access
            </li>
            <li>
              <span className="font-semibold">Tool Registry</span>: Contains the actual functions that get executed
            </li>
          </ol>
        </div>
        
        <div className="pl-4 border-l-2 border-primary">
          <h3 className="font-bold">Request Flow:</h3>
          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Client submits request with role and context</li>
            <li>MCP receives the request and validates credentials</li>
            <li>Policy discriminator checks if the role has access to the requested tool</li>
            <li>If allowed, the tool function executes and returns results</li>
            <li>If denied, an access denial message is returned instead</li>
          </ol>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="font-semibold">Key Benefits:</p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>Dynamic visibility based on role</li>  
            <li>Centralized policy enforcement</li>
            <li>Clean separation between policy and implementation</li>
            <li>Server-side validation prevents unauthorized access</li>
          </ul>
        </div>
        
        <p className="italic text-muted-foreground">
          In a real production system, this pattern enables fine-grained control over what tools 
          different agent roles can access, minimizing security risks.
        </p>
      </CardContent>
    </Card>
  );
};
