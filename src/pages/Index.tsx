import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <main className="max-w-4xl w-full space-y-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          Get Instant Access to Premium Movies
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground">
          Watch your favorite movies instantly for just $1
        </p>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground">Movie Preview</span>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-card p-8 rounded-lg border border-border">
            <p className="text-3xl font-bold mb-4">$1</p>
            <p className="text-muted-foreground mb-6">
              Instant delivery to your email
            </p>
            
            <form onSubmit={handlePayment} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Pay $1 & Get Link"}
              </Button>
            </form>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm text-muted-foreground">Secure Payment</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-muted-foreground">Instant Access</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;