#!/bin/sh

kubectl delete -k deployment/kustomization/overlays/local

docker tag $(docker build -q -f Dockerfile .) nuxt-app:latest
minikube image load nuxt-app:latest

kubectl apply -k deployment/kustomization/overlays/local
kubectl wait --for=condition=Ready deployment/nuxt-deployment
kubectl wait --for=condition=Ready pod/postgres-0

# get database url and seed the database
export DATABASE_URL="postgresql://postgres:password@$(minikube ip):$(minikube service postgres --url --format={{.Port}})/postgres"
npx prisma db push
npx prisma db seed

# expose nuxt-server on local network
kubectl port-forward service/nuxt-service 3000 3002

