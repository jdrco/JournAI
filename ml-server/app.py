import gradio as gr
from transformers import pipeline

classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=None)

def classify(s):
    labels = classifier(s)
    return(labels[0])

iface = gr.Interface(fn=classify, inputs="text", outputs="text")

iface.launch()

